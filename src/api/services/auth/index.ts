import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import {
  paths,
  SchemaAuthenticateUserSchema,
  SchemaBodySendResetEmail,
  SchemaChangePasswordSchema,
  SchemaRegisterUserSchema,
  SchemaResetPasswordSchema,
} from '@/api/generated/schema';
import { getQueryClient } from '@/api/queryClient';
import { bodyToFormData } from '@/api/utils/bodyToFormData';
import { baseUrl } from '../definitions';
import {
  getAccessToken,
  handleNonOkResponse,
  isSchemaApiErrorSchema,
  isSchemaAuthResponseSchema,
  isSchemaHttpValidationError,
  removeFromStorage,
} from './helpers';
import { SuccessResponse, AuthResponce, NonOkResonse } from './types';

export const authFetchClient = createClient<paths>({
  baseUrl: baseUrl,
});

async function getUser(): Promise<AuthResponce> {
  const response = await authFetchClient.GET('/api/v1/account/');

  if (isSchemaAuthResponseSchema(response.data)) {
    return response.data;
  }

  if (
    isSchemaApiErrorSchema(response.error) ||
    isSchemaHttpValidationError(response.error)
  ) {
    return response.error;
  }
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: Boolean(getAccessToken()),
  });
};

async function login(
  data: SchemaAuthenticateUserSchema,
): Promise<AuthResponce> {
  const response = await authFetchClient.POST('/api/v1/auth/login/', {
    body: data,
    bodySerializer: bodyToFormData,
  });

  if (isSchemaAuthResponseSchema(response.data?.user)) {
    return response.data.user;
  }

  if (
    isSchemaApiErrorSchema(response.error) ||
    isSchemaHttpValidationError(response.error)
  ) {
    return response.error;
  }
}

// to the hooks.ts
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (isSchemaAuthResponseSchema(data)) {
        getQueryClient().setQueryData(['user'], data);
      } else {
        handleNonOkResponse(data);
      }
    },
  });
};

async function register(data: SchemaRegisterUserSchema): Promise<AuthResponce> {
  const response = await authFetchClient.POST('/api/v1/auth/register/', {
    body: data,
    bodySerializer: bodyToFormData,
  });

  if (isSchemaAuthResponseSchema(response.data?.user)) {
    return response.data.user;
  }

  if (
    isSchemaApiErrorSchema(response.error) ||
    isSchemaHttpValidationError(response.error)
  ) {
    return response.error;
  }
}

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (isSchemaAuthResponseSchema(data))
        queryClient.setQueryData(['user'], data);
    },
  });
};

async function logout() {
  const response = await authFetchClient.POST('/api/v1/auth/logout/');

  if (response.response.status === 204) {
    removeFromStorage();
  }

  return response;
}

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      if (data.response.status === 204) {
        queryClient.removeQueries({ queryKey: ['user'] });
      }
    },
  });
};

async function refresh(): Promise<AuthResponce> {
  const response = await authFetchClient.POST('/api/v1/auth/refresh/');

  if (isSchemaAuthResponseSchema(response.data?.user)) {
    return response.data.user;
  }

  if (
    isSchemaApiErrorSchema(response.error) ||
    isSchemaHttpValidationError(response.error)
  ) {
    return response.error;
  }
}

export const useRefresh = () => {
  return useMutation({
    mutationFn: refresh,
    onSuccess: (data) => {
      if (isSchemaAuthResponseSchema(data))
        getQueryClient().setQueryData(['user'], data);
    },
  });
};

// Password Reset Functions

/**
 * Sends a password reset email to the provided email address
 * @param data Object containing the email address
 * @returns Success response or error
 */
async function sendResetEmail(
  data: SchemaBodySendResetEmail,
): Promise<SuccessResponse | NonOkResonse> {
  const response = await authFetchClient.POST('/api/v1/auth/password-reset/', {
    body: data,
  });

  if (response.response.ok) {
    return {
      success: true,
      message: 'Password reset email sent successfully',
    };
  }

  if (
    isSchemaApiErrorSchema(response.error) ||
    isSchemaHttpValidationError(response.error)
  ) {
    return response.error;
  }
}

/**
 * Hook for sending password reset emails
 */
export const useSendResetEmail = () => {
  return useMutation({
    mutationFn: sendResetEmail,
  });
};

/**
 * Resets a user's password using the provided token and new password
 * @param data Object containing the token, new password, and password confirmation
 * @returns Success response or error
 */
async function resetPassword({
  token,
  data,
}: {
  token: string;
  data: SchemaResetPasswordSchema;
}): Promise<AuthResponce> {
  const response = await authFetchClient.PUT('/api/v1/auth/password-reset/', {
    params: {
      query: { token },
    },
    body: data,
  });

  if (isSchemaAuthResponseSchema(response.data?.user)) {
    return response.data.user;
  }

  if (
    isSchemaApiErrorSchema(response.error) ||
    isSchemaHttpValidationError(response.error)
  ) {
    return response.error;
  }
}

/**
 * Hook for resetting a user's password
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (isSchemaAuthResponseSchema(data))
        getQueryClient().setQueryData(['user'], data);
    },
  });
};

// Password Change Functions

/**
 * Changes a user's password when they are already logged in
 * @param data Object containing current password, new password, and password confirmation
 * @returns Success response or error
 */
async function changePassword(
  data: SchemaChangePasswordSchema,
): Promise<AuthResponce> {
  const response = await authFetchClient.PUT('/api/v1/account/password/', {
    body: data,
  });

  if (isSchemaAuthResponseSchema(response.data)) {
    return response.data;
  }

  if (
    isSchemaApiErrorSchema(response.error) ||
    isSchemaHttpValidationError(response.error)
  ) {
    return response.error;
  }
}

/**
 * Hook for changing a user's password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (isSchemaAuthResponseSchema(data))
        getQueryClient().setQueryData(['user'], data);
    },
  });
};

// Email Verification Functions

/**
 * Sends a confirmation email with verification code
 * @param data Object containing the email address
 * @returns Success response or error
 */
async function sendConfirmationEmail(): Promise<
  SuccessResponse | NonOkResonse
> {
  const response = await authFetchClient.POST('/api/v1/account/email/verify/');

  if (response.response.ok) {
    return {
      success: true,
      message: 'Verification email sent successfully',
    };
  }

  if (
    isSchemaApiErrorSchema(response.error) ||
    isSchemaHttpValidationError(response.error)
  ) {
    return response.error;
  }

  return {
    success: false,
    message: 'Failed to send verification email',
  };
}

/**
 * Hook for sending email verification
 */
export const useSendConfirmationEmail = () => {
  return useMutation({
    mutationFn: sendConfirmationEmail,
  });
};

/**
 * Confirms a user's email with the verification code
 * @param data Object containing the email and verification code
 * @returns Email confirmation response or error
 */
async function confirmEmail(token: string): Promise<AuthResponce> {
  const response = await authFetchClient.PUT('/api/v1/account/email/verify/', {
    params: {
      query: { token },
    },
  });

  if (isSchemaAuthResponseSchema(response.data)) {
    return response.data;
  }

  if (
    isSchemaApiErrorSchema(response.error) ||
    isSchemaHttpValidationError(response.error)
  ) {
    return response.error;
  }
}

/**
 * Hook for confirming a user's email
 */
export const useConfirmEmail = () => {
  return useMutation({
    mutationFn: confirmEmail,
  });
};
