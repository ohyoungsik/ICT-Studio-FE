import React from 'react';
import { signup } from '../../services/auth.service';

type SignupPageProps = {
  onNavigate: (path: string) => void;
};

type SignupErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const minPasswordLength = 8;

function validateSignup(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): SignupErrors {
  const errors: SignupErrors = {};

  if (!name.trim()) {
    errors.name = '이름을 입력해주세요.';
  }

  if (!email.trim()) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!emailPattern.test(email)) {
    errors.email = '올바른 이메일 형식으로 입력해주세요.';
  }

  if (!password) {
    errors.password = '비밀번호를 입력해주세요.';
  } else if (password.length < minPasswordLength) {
    errors.password = `비밀번호는 ${minPasswordLength}자 이상이어야 합니다.`;
  }

  if (!confirmPassword) {
    errors.confirmPassword = '비밀번호 확인을 입력해주세요.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errors, setErrors] = React.useState<SignupErrors>({});
  const [submitError, setSubmitError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateSignup(name, email, password, confirmPassword);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    try {
      await signup({ name, email, password, confirmPassword });
      onNavigate('/login');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-labelledby="signup-title">
        <div className="auth-brand">
          <p className="auth-brand__eyebrow">ICT Ticketing</p>
          <h1>빠르게 시작하는 공연 예매 운영</h1>
          <p>계정을 만든 뒤 로그인 화면에서 공연 페이지로 이동합니다.</p>
        </div>

        <div className="auth-card">
          <div className="auth-copy">
            <p className="auth-eyebrow">회원가입</p>
            <h2 id="signup-title">새 계정 만들기</h2>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label>
              <span>이름</span>
              <input
                autoComplete="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'signup-name-error' : undefined}
              />
              {errors.name ? (
                <small id="signup-name-error" className="field-error">
                  {errors.name}
                </small>
              ) : null}
            </label>

            <label>
              <span>이메일</span>
              <input
                autoComplete="email"
                inputMode="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'signup-email-error' : undefined}
              />
              {errors.email ? (
                <small id="signup-email-error" className="field-error">
                  {errors.email}
                </small>
              ) : null}
            </label>

            <label>
              <span>비밀번호</span>
              <input
                autoComplete="new-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'signup-password-error' : undefined}
              />
              {errors.password ? (
                <small id="signup-password-error" className="field-error">
                  {errors.password}
                </small>
              ) : null}
            </label>

            <label>
              <span>비밀번호 확인</span>
              <input
                autoComplete="new-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? 'signup-confirm-error' : undefined}
              />
              {errors.confirmPassword ? (
                <small id="signup-confirm-error" className="field-error">
                  {errors.confirmPassword}
                </small>
              ) : null}
            </label>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '가입 중...' : '회원가입'}
            </button>
            {submitError ? <small className="field-error">{submitError}</small> : null}
          </form>

          <p className="auth-switch">
            이미 계정이 있으신가요?{' '}
            <button type="button" onClick={() => onNavigate('/login')}>
              로그인
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
