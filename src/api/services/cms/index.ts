import createClient, { Middleware } from 'openapi-fetch';
import type { paths } from '@/api/generated/schema.ts';

export const cmsFetchClient = createClient<paths>({
  baseUrl: `${process.env.CMS_PROTOCOL}://${process.env.CMS_IP}:${process.env.CMS_PORT}/`,
});

const useAccessToken: Middleware = {
  async onRequest({ request }) {
    request.headers.set('Authorization', `Bearer ${process.env.CMS_TOKEN}`);
    return request;
  },
};

cmsFetchClient.use(useAccessToken);
