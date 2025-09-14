import Cookies from 'js-cookie';

import {
  SchemaApiErrorSchema,
  SchemaHttpValidationError,
  SchemaUserSchema,
} from '@/api/generated/schema';
import { showError } from '@/utils/toasts';
import { AuthResponce, EnumTokens, NonOkResonse } from './types';

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
};

export function isSchemaApiErrorSchema(
  data: AuthResponce,
): data is SchemaApiErrorSchema {
  return typeof (data as SchemaApiErrorSchema)?.detail === 'string';
}

export function isSchemaHttpValidationError(
  data: AuthResponce,
): data is SchemaHttpValidationError {
  return typeof (data as SchemaHttpValidationError)?.detail === 'object';
}

export function isSchemaAuthResponseSchema(
  data: AuthResponce,
): data is SchemaUserSchema {
  return Boolean((data as SchemaUserSchema)?.id);
}

export const handleNonOkResponse = (response: NonOkResonse | undefined) => {
  if (!response?.detail) return;

  let error: string | undefined;
  if (typeof response.detail === 'string') {
    error = response.detail;
  } else {
    error = response.detail[0]?.msg;
  }

  showError(error ?? 'An error occurred');
};
