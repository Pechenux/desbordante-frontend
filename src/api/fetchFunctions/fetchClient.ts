import createClient from 'openapi-fetch';
import type { paths } from '../generated/serverSchema';

const baseUrl = '/';

export const fetchClient = createClient<paths>({ baseUrl });
