import { useMutation, useQueryClient } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import { paths, SchemaRegisterResponse } from '@/api/generated/schema';
import { getQueryClient } from '@/api/queryClient';
import { bodyToFormData } from '@/api/utils/bodyToFormData';
import { baseUrl } from '../definitions';
import { removeFromStorage } from './helpers';
import { LoginFormData, RegisterFormData } from './types';

export const authFetchClient = createClient<paths>({
  baseUrl: baseUrl,
});

export type ErrorResponse = {
  detail: {
    msg: string;
  }[];
};

export type LoginResponse = SchemaRegisterResponse | ErrorResponse;

async function login(data: LoginFormData): Promise<LoginResponse> {
  const response = await authFetchClient.POST('/api/auth/login', {
    body: {
      email: data.login,
      password: data.password,
    },
    bodySerializer: bodyToFormData,
  });

  if (response.data?.access_token) {
    return {
      access_token: response.data.access_token,
      user: response.data.user,
    };
  }

  return response.error as ErrorResponse;
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
    return {
      access_token: response.data.access_token,
      user: response.data.user,
    };
  }

  return response.error as ErrorResponse;
}

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if ('user' in data) queryClient.setQueryData(['user'], data.user);
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

async function refresh(): Promise<LoginResponse> {
  const response = await authFetchClient.POST('/api/auth/refresh');

  if (response.data?.access_token) {
    return {
      access_token: response.data.access_token,
      user: response.data.user,
    };
  }

  if (response.response.status === 401) {
    removeFromStorage();

    return {
      detail: [
        {
          msg: 'Token is invalid',
        },
      ],
    };
  }
  return {
    detail: [
      {
        msg: 'Something went wrong',
      },
    ],
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
