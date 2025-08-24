import { useMutation, useQueryClient } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import {
  paths,
  SchemaApiErrorSchema,
  SchemaAuthResponseSchema,
  SchemaHttpValidationError,
} from '@/api/generated/schema';
import { getQueryClient } from '@/api/queryClient';
import { bodyToFormData } from '@/api/utils/bodyToFormData';
import { baseUrl } from '../definitions';
import { removeFromStorage } from './helpers';
import {
  LoginFormData,
  RegisterFormData,
  ResetEmailRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ConfirmEmailRequest,
  SuccessResponse,
  EmailConfirmationResponse,
} from './types';

export const authFetchClient = createClient<paths>({
  baseUrl: baseUrl,
});

export type ErrorResponse = {
  detail: {
    msg: string;
  }[];
};

export type NonOkResonce =
  | SchemaApiErrorSchema
  | SchemaHttpValidationError
  | undefined;

export type AuthResponce = NonOkResonce | SchemaAuthResponseSchema;

function isSchemaApiErrorSchema(
  data: AuthResponce,
): data is SchemaApiErrorSchema {
  return typeof (data as SchemaApiErrorSchema)?.detail === 'string';
}

function isSchemaHttpValidationError(
  data: AuthResponce,
): data is SchemaHttpValidationError {
  return typeof (data as SchemaHttpValidationError)?.detail === 'object';
}

function isSchemaAuthResponseSchema(
  data: AuthResponce,
): data is SchemaAuthResponseSchema {
  return Boolean((data as SchemaAuthResponseSchema)?.access_token);
}

async function login(data: LoginFormData): Promise<AuthResponce> {
  const response = await authFetchClient.POST('/api/auth/login/', {
    body: data,
    bodySerializer: bodyToFormData,
  });

  if (isSchemaAuthResponseSchema(response.data)) {
    return {
      access_token: response.data.access_token,
      user: response.data.user,
    };
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
      if (isSchemaAuthResponseSchema(data))
        getQueryClient().setQueryData(['user'], data.user);
    },
  });
};

async function register(data: RegisterFormData): Promise<AuthResponce> {
  const response = await authFetchClient.POST('/api/auth/register/', {
    body: data,
    bodySerializer: bodyToFormData,
  });

  if (isSchemaAuthResponseSchema(response.data)) {
    return {
      access_token: response.data.access_token,
      user: response.data.user,
    };
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
        queryClient.setQueryData(['user'], data.user);
    },
  });
};

async function logout() {
  const response = await authFetchClient.POST('/api/auth/logout/');

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
  const response = await authFetchClient.POST('/api/auth/refresh/');

  if (isSchemaAuthResponseSchema(response.data)) {
    return {
      access_token: response.data.access_token,
      user: response.data.user,
    };
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
        getQueryClient().setQueryData(['user'], data.user);
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
  data: ResetEmailRequest,
): Promise<SuccessResponse | NonOkResonce> {
  const response = await authFetchClient.POST('/api/auth/password-reset/', {
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

  return {
    success: false,
    message: 'Failed to send password reset email',
  };
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
async function resetPassword(
  data: ResetPasswordRequest,
): Promise<SuccessResponse | NonOkResonce> {
  const response = await authFetchClient.POST('/api/auth/password-reset/', {
    body: data,
  });

  if (response.response.ok) {
    return {
      success: true,
      message: 'Password reset successfully',
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
    message: 'Failed to reset password',
  };
}

/**
 * Hook for resetting a user's password
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

// Password Change Functions

/**
 * Changes a user's password when they are already logged in
 * @param data Object containing current password, new password, and password confirmation
 * @returns Success response or error
 */
async function changePassword(
  data: ChangePasswordRequest,
): Promise<SuccessResponse | NonOkResonce> {
  const response = await authFetchClient.PUT('/api/account/password/', {
    body: data,
  });

  if (response.response.ok) {
    return {
      success: true,
      message: 'Password changed successfully',
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
    message: 'Failed to change password',
  };
}

/**
 * Hook for changing a user's password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

// Email Verification Functions

/**
 * Sends a confirmation email with verification code
 * @param data Object containing the email address
 * @returns Success response or error
 */
async function sendConfirmationEmail(): Promise<
  SuccessResponse | NonOkResonce
> {
  const response = await authFetchClient.POST('/api/account/email/verify/');

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
async function confirmEmail(
  data: ConfirmEmailRequest,
): Promise<EmailConfirmationResponse | NonOkResonce> {
  const response = await authFetchClient.PUT('/api/account/email/verify/', {
    params: {
      query: data,
    },
  });

  if (response.response.ok) {
    return {
      success: true,
      verified: true,
      message: 'Email verified successfully',
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
    verified: false,
    message: 'Failed to verify email',
  };
}

/**
 * Hook for confirming a user's email
 */
export const useConfirmEmail = () => {
  return useMutation({
    mutationFn: confirmEmail,
  });
};
