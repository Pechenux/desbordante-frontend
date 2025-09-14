import {
  SchemaApiErrorSchema,
  SchemaHttpValidationError,
  SchemaUserSchema,
} from '@/api/generated/schema';

export type ErrorResponse = {
  detail: {
    msg: string;
  }[];
};

export type NonOkResonse =
  | SchemaApiErrorSchema
  | SchemaHttpValidationError
  | undefined;

export type AuthResponce = NonOkResonse | SchemaUserSchema;

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken',
}

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
}

export interface ITokenInside {
  id: number;
  role: UserRole;
  iat: number;
  exp: number;
}

export type TProtectUserData = Omit<ITokenInside, 'iat' | 'exp'>;

// Response types
export interface SuccessResponse {
  success: boolean;
  message?: string;
}
