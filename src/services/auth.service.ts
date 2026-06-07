import type { AuthResult, LoginPayload, SignupPayload } from '../types/auth.type';

export async function login(_payload: LoginPayload): Promise<AuthResult> {
  return { ok: true };
}

export async function signup(_payload: SignupPayload): Promise<AuthResult> {
  return { ok: true };
}
