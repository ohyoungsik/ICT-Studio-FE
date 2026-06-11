import React from 'react';
import { MainLayout } from './layouts/MainLayout';
import { BookingConfirmPage } from './pages/Tickets/BookingConfirmPage';
import { LoginPage } from './pages/auth/LoginPage';
import { MyTicketsPage } from './pages/Tickets/MyTicketsPage';
import { SeatSelectionPage } from './pages/Tickets/SeatSelectionPage';
import { SignupPage } from './pages/auth/SignupPage';
import { TicketPage } from './pages/Tickets/TicketPage';
import { isAuthenticated } from './services/auth.service';
import { createBooking, getConcerts, getMyBookings } from './services/ticket.service';
import type { Booking, BookingDraft, Concert } from './types/ticket.type';

const FinOpsDashboard = React.lazy(() => import('./pages/finops'));

function getCurrentPath() {
  if (window.location.hash === '#/finops') {
    return '/finops-dashboard';
  }

  return window.location.pathname;
}

function getActivePath(path: string) {
  if (path === '/my-tickets') {
    return '/my-tickets';
  }

  if (path === '/finops-dashboard' || path === '/dashboard') {
    return '/finops-dashboard';
  }

  return '/tickets';
}

function App() {
  const [path, setPath] = React.useState(getCurrentPath);
  const [bookingDraft, setBookingDraft] = React.useState<BookingDraft | null>(null);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [concerts, setConcerts] = React.useState<Concert[]>([]);
  const [isLoadingConcerts, setIsLoadingConcerts] = React.useState(false);
  const [isLoadingBookings, setIsLoadingBookings] = React.useState(false);
  const [appError, setAppError] = React.useState('');

  const navigate = React.useCallback((nextPath: string) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  }, []);

  const loadConcerts = React.useCallback(async () => {
    setIsLoadingConcerts(true);
    setAppError('');

    try {
      setConcerts(await getConcerts());
    } catch (error) {
      setAppError(error instanceof Error ? error.message : '공연 목록을 불러오지 못했습니다.');
    } finally {
      setIsLoadingConcerts(false);
    }
  }, []);

  const loadBookings = React.useCallback(async () => {
    if (!isAuthenticated()) {
      setBookings([]);
      return;
    }

    setIsLoadingBookings(true);

    try {
      setBookings(await getMyBookings());
    } catch (error) {
      setAppError(error instanceof Error ? error.message : '예매 내역을 불러오지 못했습니다.');
    } finally {
      setIsLoadingBookings(false);
    }
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

  React.useEffect(() => {
    if (path !== '/' && path !== '/login' && path !== '/signup') {
      void loadConcerts();
    }
  }, [loadConcerts, path]);

  React.useEffect(() => {
    if (path === '/my-tickets') {
      void loadBookings();
    }
  }, [loadBookings, path]);

  const renderWithLayout = (children: React.ReactNode) => (
    <MainLayout activePath={getActivePath(path)} onNavigate={navigate}>
      {appError ? <p className="field-error">{appError}</p> : null}
      {children}
    </MainLayout>
  );

  const renderTicketList = () => {
    if (isLoadingConcerts) {
      return renderWithLayout(<main className="tickets-page">공연 목록을 불러오는 중입니다.</main>);
    }

    return renderWithLayout(<TicketPage concerts={concerts} onBook={handleStartBooking} />);
  };

  const handleStartBooking = (concertId: string) => {
    setBookingDraft(null);
    navigate(`/booking/${concertId}`);
  };

  const handleProceedBooking = (concertId: string, seats: string[]) => {
    setBookingDraft({ concertId, seats });
    navigate(`/tickets/${concertId}`);
  };

  const handleCompleteBooking = async (concertId: string) => {
    if (!bookingDraft || bookingDraft.concertId !== concertId) {
      return;
    }

    setAppError('');

    try {
      const nextBooking = await createBooking(concertId, bookingDraft.seats);
      setBookings((currentBookings) => [nextBooking, ...currentBookings]);
      setBookingDraft(null);
      await loadConcerts();
      navigate('/my-tickets');
    } catch (error) {
      setAppError(error instanceof Error ? error.message : '예매를 완료하지 못했습니다.');
    }
  };

  if (path === '/' || path === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }

  if (path === '/signup') {
    return <SignupPage onNavigate={navigate} />;
  }

  if (path === '/tickets') {
    return renderTicketList();
  }

  const bookingMatch = path.match(/^\/booking\/([^/]+)$/);

  if (bookingMatch) {
    const concertId = bookingMatch[1];
    const concert = concerts.find((concertItem) => concertItem.id === concertId);

    if (isLoadingConcerts) {
      return renderWithLayout(<main className="booking-page">좌석 정보를 불러오는 중입니다.</main>);
    }

    if (!concert) {
      return renderTicketList();
    }

    return renderWithLayout(
      <SeatSelectionPage
        concert={concert}
        onBack={() => navigate('/tickets')}
        onProceed={(selectedSeats) => handleProceedBooking(concertId, selectedSeats)}
      />,
    );
  }

  const confirmationMatch = path.match(/^\/tickets\/([^/]+)$/);

  if (confirmationMatch) {
    const concertId = confirmationMatch[1];
    const concert = concerts.find((concertItem) => concertItem.id === concertId);

    if (isLoadingConcerts) {
      return renderWithLayout(<main className="booking-page">예매 정보를 불러오는 중입니다.</main>);
    }

    if (!concert) {
      return renderTicketList();
    }

    const matchingDraft = bookingDraft?.concertId === concertId ? bookingDraft : null;

    return renderWithLayout(
      <BookingConfirmPage
        concert={concert}
        draft={matchingDraft}
        onBackToSeats={() => navigate(`/booking/${concertId}`)}
        onComplete={() => void handleCompleteBooking(concertId)}
        onMyTickets={() => navigate('/my-tickets')}
      />,
    );
  }

  if (path === '/my-tickets') {
    if (isLoadingBookings) {
      return renderWithLayout(<main className="tickets-page">예매 내역을 불러오는 중입니다.</main>);
    }

    return renderWithLayout(<MyTicketsPage bookings={bookings} />);
  }

  if (path === '/finops-dashboard' || path === '/dashboard') {
    return renderWithLayout(
      <React.Suspense fallback={null}>
        <FinOpsDashboard />
      </React.Suspense>,
    );
  }

  return <LoginPage onNavigate={navigate} />;
}

export default App;
