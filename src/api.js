/**
 * Central API helper.
 * - In dev (Vite proxy active): calls /api/... → proxied to backend
 * - In production (Firebase Hosting): calls full backend URL directly
 */
const BASE = import.meta.env.PROD
    ? 'https://hope3services.cloud'  // ← MUST support HTTPS for Firebase Hosting
    : '';                           // ← dev: use Vite proxy (relative /api/...)

export function apiUrl(path) {
    // path should start with /api/...
    return `${BASE}${path}`;
}

export function apiFetch(path, options = {}) {
    const url = apiUrl(path);
    console.log(`[API] Fetching: ${url}`, options);
    return fetch(url, options);
}
