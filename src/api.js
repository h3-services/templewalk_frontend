/**
 * Central API helper.
 * - In dev (Vite proxy active): calls /api/... → proxied to backend
 * - In production (Firebase Hosting): calls /api/... → Firebase Cloud Function proxy
 * Both modes use relative paths; no direct cross-origin calls.
 */
const BASE = '';  // Always use relative paths — proxied in both dev and prod

export function apiUrl(path) {
    // path should start with /api/...
    return `${BASE}${path}`;
}

export function apiFetch(path, options = {}) {
    const url = apiUrl(path);
    console.log(`[API] Fetching: ${url}`, options);
    return fetch(url, options);
}
