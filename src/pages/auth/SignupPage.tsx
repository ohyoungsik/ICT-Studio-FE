import React from 'react';
import { signup } from '../../services/authService';

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateSignup(name, email, password, confirmPassword);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await signup({ name, email, password, confirmPassword });
    setIsSubmitting(false);
    onNavigate('/login');
  };

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="signup-title">
        <div className="auth-copy">
          <p className="auth-eyebrow">FinOps 대시보드</p>
          <h1 id="signup-title">회원가입</h1>
          <p>현재는 로컬 모의 흐름으로 가입한 뒤 로그인 화면으로 이동합니다.</p>
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
        </form>

        <p className="auth-switch">
          이미 계정이 있으신가요?{' '}
          <button type="button" onClick={() => onNavigate('/login')}>
            로그인
          </button>
        </p>
      </section>
    </main>
  );
}
