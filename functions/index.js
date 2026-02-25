const functions = require("firebase-functions");
const fetch = require("node-fetch");

const BACKEND_URL = "https://hope3services.cloud";

/**
 * Reverse proxy Cloud Function.
 * All requests to /api/* on Firebase Hosting are rewritten to this function,
 * which forwards them to the actual backend at hope3services.cloud.
 * This avoids CORS issues since the browser sees same-origin requests.
 */
exports.api = functions.https.onRequest(async (req, res) => {
    // Build the target URL — req.url will be like /api/users/?skip=0&limit=2000
    const targetUrl = `${BACKEND_URL}${req.url}`;

    try {
        // Forward the request with the same method, headers, and body
        const headers = { ...req.headers };
        // Remove host/origin headers that would confuse the backend
        delete headers["host"];
        delete headers["origin"];
        delete headers["referer"];
        // Remove headers that are hop-by-hop (not forwarded)
        delete headers["connection"];
        delete headers["transfer-encoding"];

        const fetchOptions = {
            method: req.method,
            headers: headers,
        };

        // Forward body for POST, PUT, PATCH, DELETE
        if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method) && req.body) {
            if (typeof req.body === "object") {
                fetchOptions.body = JSON.stringify(req.body);
                fetchOptions.headers["content-type"] = "application/json";
            } else {
                fetchOptions.body = req.body;
            }
        }

        console.log(`[Proxy] ${req.method} ${targetUrl}`);
        const backendRes = await fetch(targetUrl, fetchOptions);

        // Forward the status code
        res.status(backendRes.status);

        // Forward response headers (except hop-by-hop)
        const skipHeaders = new Set([
            "transfer-encoding",
            "connection",
            "keep-alive",
        ]);
        backendRes.headers.forEach((value, key) => {
            if (!skipHeaders.has(key.toLowerCase())) {
                res.set(key, value);
            }
        });

        // Forward the response body
        const body = await backendRes.text();
        res.send(body);
    } catch (error) {
        console.error(`[Proxy] Error forwarding ${req.method} ${targetUrl}:`, error);
        res.status(502).json({
            error: "Bad Gateway",
            message: "Failed to reach backend server",
        });
    }
});
