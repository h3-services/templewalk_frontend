/**
 * Central API helper.
 * - In dev (Vite proxy active): calls /api/... → proxied to backend
 * - In production (Firebase Hosting): calls full backend URL directly
 */
const BASE = import.meta.env.PROD
    ? 'https://72.61.250.191:8002'  // ← MUST support HTTPS for Firebase Hosting
    : '';                           // ← dev: use Vite proxy (relative /api/...)

export function apiUrl(path) {
    // path should start with /api/...
    return `${BASE}${path}`;
}

export function apiFetch(path, options = {}) {
    return fetch(apiUrl(path), options);
}
