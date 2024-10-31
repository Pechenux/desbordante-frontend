import createClient from 'openapi-fetch';
import type { paths } from '../generated/schema.ts';

const baseUrl = '/';

export const fetchClient = createClient<paths>({ baseUrl });
