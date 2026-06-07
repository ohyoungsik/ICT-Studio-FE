import React from 'react';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { TicketPage } from './pages/Tickets/TicketPage';

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

  if (path === '/' || path === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }

  if (path === '/signup') {
    return <SignupPage onNavigate={navigate} />;
  }

  if (path === '/tickets') {
    return (
      <MainLayout activePath={path} onNavigate={navigate}>
        <TicketPage />
      </MainLayout>
    );
  }

  if (path === '/finops-dashboard' || path === '/dashboard') {
    return (
      <MainLayout activePath="/finops-dashboard" onNavigate={navigate}>
        <React.Suspense fallback={null}>
          <FinOpsDashboard />
        </React.Suspense>
      </MainLayout>
    );
  }

  return <LoginPage onNavigate={navigate} />;
}

export default App;
