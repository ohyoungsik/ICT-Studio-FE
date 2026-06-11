import type { AuthResult, LoginPayload, SignupPayload } from '../types/auth.type';
import {
  apiRequest,
  clearSession,
  getStoredToken,
  getStoredUser,
  storeSession,
  type ApiUser,
} from './apiClient';

type LoginResponse = {
  token: string;
  user: ApiUser;
};

export async function login(payload: LoginPayload): Promise<AuthResult> {
  const result = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  storeSession(result.token, result.user);

  return { ok: true, token: result.token, user: result.user };
}

export async function signup(payload: SignupPayload): Promise<AuthResult> {
  const { confirmPassword: _confirmPassword, ...signupPayload } = payload;
  const user = await apiRequest<ApiUser>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(signupPayload),
  });

  return { ok: true, user };
}

export async function logout() {
  if (getStoredToken()) {
    try {
      await apiRequest('/auth/logout', { method: 'POST', auth: true });
    } finally {
      clearSession();
    }
    return;
  }

  clearSession();
}

export function getCurrentUser() {
  return getStoredUser();
}

export function isAuthenticated() {
  return Boolean(getStoredToken());
}
