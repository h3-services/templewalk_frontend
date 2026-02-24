/**
 * Central API helper.
 * - In dev (Vite proxy active): calls /api/... → proxied to backend
 * - In production (Firebase Hosting): calls full backend URL directly
 */
const BASE = import.meta.env.PROD
    ? 'http://72.61.250.191:8002'   // ← backend server (http is fine; CORS must be open)
    : '';                            // ← dev: use Vite proxy (relative /api/...)

export function apiUrl(path) {
    // path should start with /api/...
    return `${BASE}${path}`;
}

export function apiFetch(path, options = {}) {
    return fetch(apiUrl(path), options);
}
