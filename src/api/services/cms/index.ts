import createClient, { Middleware } from 'openapi-fetch';
import type { paths } from '@/api/generated/schema.ts';

export const cmsFetchClient = createClient<paths>({
  baseUrl: 'http:/127.0.0.1:3000/',
});

const useAccessToken: Middleware = {
  async onRequest({ request }) {
    request.headers.set('Authorization', `Bearer ${process.env.CMS_TOKEN}`);
    return request;
  },
};

cmsFetchClient.use(useAccessToken);
