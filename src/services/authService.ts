export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthResult = {
  ok: true;
};

export async function login(_payload: LoginPayload): Promise<AuthResult> {
  return { ok: true };
}

export async function signup(_payload: SignupPayload): Promise<AuthResult> {
  return { ok: true };
}
