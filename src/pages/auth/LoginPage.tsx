import React from 'react';
import { login } from '../../services/auth.service';

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
  const [submitError, setSubmitError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
      onNavigate('/tickets');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-labelledby="login-title">
        <div className="auth-brand">
          <p className="auth-brand__eyebrow">ICT Ticketing</p>
          <h1>콘서트 예매 운영을 위한 모던 대시보드</h1>
          <p>공연 예매 화면과 FinOps 대시보드를 한 곳에서 확인하세요.</p>
        </div>

        <div className="auth-card">
          <div className="auth-copy">
            <p className="auth-eyebrow">로그인</p>
            <h2 id="login-title">계정으로 로그인</h2>
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
            {submitError ? <small className="field-error">{submitError}</small> : null}
          </form>

          <p className="auth-switch">
            아직 계정이 없으신가요?{' '}
            <button type="button" onClick={() => onNavigate('/signup')}>
              회원가입
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
