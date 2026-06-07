import type { ReactNode } from 'react';

type MainLayoutProps = {
  activePath: string;
  children: ReactNode;
  onNavigate: (path: string) => void;
};

export function MainLayout({ activePath, children, onNavigate }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <header className="main-nav">
        <button className="main-nav__brand" type="button" onClick={() => onNavigate('/tickets')}>
          ICT Ticketing
        </button>
        <nav aria-label="주요 메뉴">
          <button
            className={activePath === '/tickets' ? 'is-active' : undefined}
            type="button"
            onClick={() => onNavigate('/tickets')}
          >
            Tickets
          </button>
          <button
            className={activePath === '/my-tickets' ? 'is-active' : undefined}
            type="button"
            onClick={() => onNavigate('/my-tickets')}
          >
            My Tickets
          </button>
          <button
            className={activePath === '/finops-dashboard' ? 'is-active' : undefined}
            type="button"
            onClick={() => onNavigate('/finops-dashboard')}
          >
            FinOps
          </button>
          <button type="button" onClick={() => onNavigate('/login')}>
            Logout
          </button>
        </nav>
      </header>
      {children}
    </div>
  );
}
