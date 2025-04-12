import createClient from 'openapi-fetch';
import type { paths } from '../generated/serverSchema';

const baseUrl = '/api';

export const fetchClient = createClient<paths>({ baseUrl });
