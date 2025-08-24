import {
  SchemaAuthenticateUserSchema,
  SchemaRegisterUserSchema,
} from '@/api/generated/schema';

export type LoginFormData = SchemaAuthenticateUserSchema;

export type RegisterFormData = SchemaRegisterUserSchema;

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

// Password reset types
export interface ResetEmailRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  password: string;
  password_confirm: string;
}

// Password change types
export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface ConfirmEmailRequest {
  token: string;
}

// Response types
export interface SuccessResponse {
  success: boolean;
  message?: string;
}

export interface EmailConfirmationResponse extends SuccessResponse {
  verified: boolean;
}
