import React from 'react';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';

const FinOpsDashboard = React.lazy(() => import('./pages/finops'));

function getCurrentPath() {
  if (window.location.hash === '#/finops') {
    return '/finops-dashboard';
  }

  return window.location.pathname;
}

function App() {
  const [path, setPath] = React.useState(getCurrentPath);

  const navigate = React.useCallback((nextPath: string) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  }, []);

  React.useEffect(() => {
    const handleLocationChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  if (path === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }

  if (path === '/signup') {
    return <SignupPage onNavigate={navigate} />;
  }

  if (path === '/dashboard' || path === '/finops-dashboard') {
    return (
      <React.Suspense fallback={null}>
        <FinOpsDashboard />
      </React.Suspense>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>FinOps 대시보드</h1>
        <p>로그인하거나 계정을 만든 뒤 계속 진행하세요.</p>
        <nav className="home-actions" aria-label="인증 링크">
          <button type="button" onClick={() => navigate('/login')}>
            로그인
          </button>
          <button type="button" onClick={() => navigate('/signup')}>
            회원가입
          </button>
        </nav>
      </header>
    </div>
  );
}

export default App;
