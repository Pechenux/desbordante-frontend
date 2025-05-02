'use server';

import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { EnumTokens, ITokenInside } from '@/api/services/auth/types';
// import {
//   TUserDataState,
//   transformUserToState,
// } from '../transform-user-to-state';

export async function getServerAuth(): Promise<void> {
  const JWT_SECRET = process.env.JWT_SECRET;
  const accessToken = (await cookies()).get(EnumTokens.ACCESS_TOKEN)?.value;
  const refreshToken = (await cookies()).get(EnumTokens.REFRESH_TOKEN)?.value;

  if (!refreshToken) return;

  if (!accessToken) {
    try {
      // const data = await refresh();
      // accessToken = data.accessToken;
    } catch {
      return;
    }
  }

  if (!accessToken) return;

  try {
    const { payload }: { payload: ITokenInside } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(`${JWT_SECRET}`),
    );

    if (!payload) return;

    console.log({ payload });

    // return transformUserToState(payload);
  } catch {
    return;
  }
}
