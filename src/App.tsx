import React from 'react';

const FinOpsDashboard = React.lazy(() => import('./pages/finops'));

function App() {
  const [hash, setHash] = React.useState(() => window.location.hash);

  React.useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (hash === '#/finops') {
    return (
      <React.Suspense fallback={null}>
        <FinOpsDashboard />
      </React.Suspense>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>Welcome to React + TypeScript</h1>
        <p>This workspace is set up for a TypeScript-based React app.</p>
      </header>
    </div>
  );
}

export default App;
