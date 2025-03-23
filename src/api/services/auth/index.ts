import { useMutation } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import { bodyToFormData } from '@/api/fetchFunctions';
import { paths, SchemaUserSchema } from '@/api/generated/schema';
import { getQueryClient } from '@/api/queryClient';
import { baseUrl } from '../definitions';
import { removeFromStorage, saveTokenStorage } from './helpers';
import { LoginFormData, RegisterFormData } from './types';

export const authFetchClient = createClient<paths>({
  baseUrl: baseUrl,
});

export type SuccessResponse = {
  access_token: string;
  user: SchemaUserSchema;
};

export type ErrorResponse = {
  error: string;
};

export type LoginResponse = SuccessResponse | ErrorResponse;

async function login(data: LoginFormData): Promise<LoginResponse> {
  const response = await authFetchClient.POST('/api/auth/login', {
    body: {
      email: data.login,
      password: data.password,
    },
    bodySerializer: bodyToFormData,
  });

  if (response.data?.access_token) {
    saveTokenStorage(response.data.access_token);

    return {
      access_token: response.data.access_token,
      user: response.data.user,
    };
  }

  return {
    error: response.error as string,
  };
}

// to the hooks.ts
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if ('user' in data) getQueryClient().setQueryData(['user'], data.user);
    },
  });
};

async function register(data: RegisterFormData): Promise<LoginResponse> {
  const response = await authFetchClient.POST('/api/auth/register', {
    body: {
      email: data.login,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
    },
    bodySerializer: bodyToFormData,
  });

  if (response.data?.access_token) {
    saveTokenStorage(response.data?.access_token);

    return {
      access_token: response.data.access_token,
      user: response.data.user,
    };
  }

  return {
    error: response.error as string,
  };
}

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if ('user' in data) getQueryClient().setQueryData(['user'], data.user);
    },
  });
};

async function logout() {
  const response = await authFetchClient.POST('/api/auth/logout');

  if (response.response.status === 204) {
    removeFromStorage();
  }

  return response;
}

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      if (data.response.status === 204)
        getQueryClient().setQueryData(['user'], undefined);
    },
  });
};

async function refresh(): Promise<LoginResponse> {
  const response = await authFetchClient.POST('/api/auth/refresh');

  if (response.data?.access_token) {
    saveTokenStorage(response.data?.access_token);

    return {
      access_token: response.data.access_token,
      user: response.data.user,
    };
  }

  if (response.response.status === 401) {
    removeFromStorage();

    return {
      error: 'Token is invalid',
    };
  }

  return {
    error: response.error as string,
  };
}

export const useRefresh = () => {
  return useMutation({
    mutationFn: refresh,
    onSuccess: (data) => {
      if ('user' in data) getQueryClient().setQueryData(['user'], data.user);
    },
  });
};
