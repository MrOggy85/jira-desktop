/* eslint-disable @typescript-eslint/no-explicit-any */

import { request, ENDPOINT } from './request';

type Session = {
  self: string;
  name: string;
  loginInfo: {
    loginCount: number;
    previousLoginTime: string;
  };
}

type LoginResponse = {
  session: {
    name: string;
    value: string;
  };
  loginInfo: {
    loginCount: number;
    previousLoginTime: string;
  };
}

type UserResponse = {
  self: string;
  name: string;
  emailAddress: string;
  avatarUrls: Record<string, string>;
  displayName: string;
  active: boolean;
  timeZone: string;
  groups: any;
  applicationRoles: {
    size: number;
    items: any[];
  };
  expand: string;
};

export async function getUserFromJira() {
  const result = await request<UserResponse>({
    endpoint: `${ENDPOINT.MYSELF}`,
  });

  return result;
}

export async function login(username: string, password: string) {
  await request<LoginResponse>({
    endpoint: `${ENDPOINT.LOGIN}`,
    method: 'POST',
    body: {
      username,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    withUserCredentials: false,
  });
  return true;
}
