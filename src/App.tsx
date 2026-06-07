import React from 'react';
import { MainLayout } from './layouts/MainLayout';
import { BookingConfirmPage } from './pages/Tickets/BookingConfirmPage';
import { LoginPage } from './pages/auth/LoginPage';
import { MyTicketsPage } from './pages/Tickets/MyTicketsPage';
import { SeatSelectionPage } from './pages/Tickets/SeatSelectionPage';
import { SignupPage } from './pages/auth/SignupPage';
import { TicketPage } from './pages/Tickets/TicketPage';
import { concerts, mockBookings } from './pages/Tickets/ticketMockData';
import type { Booking, BookingDraft } from './types/ticket.type';

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

function getTotalPrice(concertId: string, seatIds: string[]) {
  const concert = concerts.find((concertItem) => concertItem.id === concertId);

  if (!concert) {
    return 0;
  }

  return concert.seats
    .filter((seat) => seatIds.includes(seat.id))
    .reduce((total, seat) => total + seat.price, 0);
}

function App() {
  const [path, setPath] = React.useState(getCurrentPath);
  const [bookingDraft, setBookingDraft] = React.useState<BookingDraft | null>(null);
  const [bookings, setBookings] = React.useState<Booking[]>(mockBookings);

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

  const renderWithLayout = (children: React.ReactNode) => (
    <MainLayout activePath={getActivePath(path)} onNavigate={navigate}>
      {children}
    </MainLayout>
  );

  const handleStartBooking = (concertId: string) => {
    setBookingDraft(null);
    navigate(`/booking/${concertId}`);
  };

  const handleProceedBooking = (concertId: string, seats: string[]) => {
    setBookingDraft({ concertId, seats });
    navigate(`/tickets/${concertId}`);
  };

  const handleCompleteBooking = (concertId: string) => {
    const concert = concerts.find((concertItem) => concertItem.id === concertId);

    if (!concert || !bookingDraft || bookingDraft.concertId !== concertId) {
      return;
    }

    const nextBooking: Booking = {
      id: `booking-${concertId}-${Date.now()}`,
      concertId,
      concertTitle: concert.title,
      seats: bookingDraft.seats,
      totalPrice: getTotalPrice(concertId, bookingDraft.seats),
      booker: '홍길동',
      bookedAt: '2026-06-07',
    };

    setBookings((currentBookings) => [nextBooking, ...currentBookings]);
    setBookingDraft(null);
    navigate('/my-tickets');
  };

  if (path === '/' || path === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }

  if (path === '/signup') {
    return <SignupPage onNavigate={navigate} />;
  }

  if (path === '/tickets') {
    return renderWithLayout(<TicketPage concerts={concerts} onBook={handleStartBooking} />);
  }

  const bookingMatch = path.match(/^\/booking\/([^/]+)$/);

  if (bookingMatch) {
    const concertId = bookingMatch[1];
    const concert = concerts.find((concertItem) => concertItem.id === concertId);

    if (!concert) {
      return renderWithLayout(<TicketPage concerts={concerts} onBook={handleStartBooking} />);
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

    if (!concert) {
      return renderWithLayout(<TicketPage concerts={concerts} onBook={handleStartBooking} />);
    }

    const matchingDraft = bookingDraft?.concertId === concertId ? bookingDraft : null;

    return renderWithLayout(
      <BookingConfirmPage
        concert={concert}
        draft={matchingDraft}
        onBackToSeats={() => navigate(`/booking/${concertId}`)}
        onComplete={() => handleCompleteBooking(concertId)}
        onMyTickets={() => navigate('/my-tickets')}
      />,
    );
  }

  if (path === '/my-tickets') {
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
