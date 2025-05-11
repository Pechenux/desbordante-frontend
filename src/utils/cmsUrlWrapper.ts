import { cmsProxyUrl } from '@/api/services/definitions';

export const cmsUrlWrapper = (pathname: string) => `${cmsProxyUrl}${pathname}?`;
