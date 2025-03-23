import { Middleware } from 'openapi-fetch';

const UNPROTECTED_ROUTES = ['/v1/login', '/v1/logout'];

export const useAccessToken: Middleware = {
  async onRequest({ request, schemaPath }) {
    if (
      UNPROTECTED_ROUTES.some((pathname) => schemaPath.startsWith(pathname))
    ) {
      return undefined;
    }

    request.headers.set('Authorization', `Bearer`);
    return request;
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      try {
      } catch {}
    }
  },
};
