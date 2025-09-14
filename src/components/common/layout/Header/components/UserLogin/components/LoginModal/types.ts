import {
  SchemaAuthenticateUserSchema,
  SchemaBodySendResetEmail,
  SchemaRegisterUserSchema,
  SchemaResetPasswordSchema,
} from '@/api/generated/schema';

export type LoginFormData = SchemaAuthenticateUserSchema;

export type RegisterFormData = SchemaRegisterUserSchema;

export type ResetEmailRequest = SchemaBodySendResetEmail;

export type ResetPasswordRequest = SchemaResetPasswordSchema & {
  token: string;
  new_password_confirm: SchemaResetPasswordSchema['new_password'];
};

export type ConfirmEmailRequest = { token: string };

export type FormDataType =
  | LoginFormData
  | RegisterFormData
  | ResetEmailRequest
  | ResetPasswordRequest
  | ConfirmEmailRequest;

export enum LoginModalState {
  LOGIN = 'login',
  REGISTER = 'register',
  EMAIL_VERIFY = 'email_verify',
  PASSWORD_RESET_EMAIL = 'password_reset_email',
  PASSWORD_RESET_FORM = 'password_reset_form',
}
