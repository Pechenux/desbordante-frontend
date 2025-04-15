export type LoginFormData = {
  login: string;
  password: string;
};

export type RegisterFormData = LoginFormData & {
  first_name: string;
  last_name: string;
};

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
