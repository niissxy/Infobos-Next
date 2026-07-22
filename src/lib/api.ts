// Development stays same-origin so Vite can proxy requests to the local
// Laravel server. Production uses the dedicated public API host.
const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL
  || (import.meta.env.DEV ? '/api' : 'https://api.infobos.news/api');

export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, '');

function resolveApiRequest(input: RequestInfo | URL): RequestInfo | URL {
  if (typeof input !== 'string') return input;
  if (!input.startsWith('/api/')) return input;

  // Existing callers use `/api/v1/...`; retain that contract while sending
  // the request to the dedicated API domain as `/api/v1/...`.
  return `${API_BASE_URL}${input.slice('/api'.length)}`;
}

/**
 * Routes legacy relative API calls through one configurable external API base.
 * This keeps every feature on the same API host without duplicating URL logic
 * throughout UI components.
 */
export function configureApiFetch(): void {
  if (typeof window === 'undefined' || window.fetch.name === 'infobosApiFetch') return;

  const browserFetch = window.fetch.bind(window);
  const infobosApiFetch = (input: RequestInfo | URL, init?: RequestInit) =>
    browserFetch(resolveApiRequest(input), init);

  Object.defineProperty(infobosApiFetch, 'name', { value: 'infobosApiFetch' });
  window.fetch = infobosApiFetch;
}
