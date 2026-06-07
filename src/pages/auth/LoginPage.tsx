import React from 'react';
import { login } from '../../services/authService';

type LoginPageProps = {
  onNavigate: (path: string) => void;
};

type LoginErrors = {
  email?: string;
  password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};

  if (!email.trim()) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!emailPattern.test(email)) {
    errors.email = '올바른 이메일 형식으로 입력해주세요.';
  }

  if (!password) {
    errors.password = '비밀번호를 입력해주세요.';
  }

  return errors;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await login({ email, password });
    setIsSubmitting(false);
    onNavigate('/dashboard');
  };

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="auth-copy">
          <p className="auth-eyebrow">FinOps 대시보드</p>
          <h1 id="login-title">로그인</h1>
          <p>모의 인증 흐름으로 기존 대시보드에 접속합니다.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>이메일</span>
            <input
              autoComplete="email"
              inputMode="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
            />
            {errors.email ? (
              <small id="login-email-error" className="field-error">
                {errors.email}
              </small>
            ) : null}
          </label>

          <label>
            <span>비밀번호</span>
            <input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
            />
            {errors.password ? (
              <small id="login-password-error" className="field-error">
                {errors.password}
              </small>
            ) : null}
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="auth-switch">
          아직 계정이 없으신가요?{' '}
          <button type="button" onClick={() => onNavigate('/signup')}>
            회원가입
          </button>
        </p>
      </section>
    </main>
  );
}
