import type { Booking, Concert, Seat, SeatGrade } from '../types/ticket.type';
import { getCurrentUser } from './auth.service';
import { apiRequest } from './apiClient';

type ApiConcert = {
  id: string;
  title: string;
  artist: string;
  venue: string;
  date: string;
  status: 'OPEN' | 'CLOSED';
  description: string;
  price: number;
};

type ApiConcertListResponse = {
  concerts: ApiConcert[];
  page: number;
  size: number;
  total: number;
};

type ApiSeat = {
  id: string;
  row: string;
  number: number;
  status: 'AVAILABLE' | 'BOOKED';
  price: number;
};

type ApiSeatListResponse = {
  concertId: string;
  seats: ApiSeat[];
};

type ApiBooking = {
  id: string;
  userId: string;
  concertId: string;
  concertTitle: string;
  seatIds: string[];
  totalPrice: number;
  status: 'CONFIRMED';
  createdAt: string;
};

type ApiBookingListResponse = {
  bookings: ApiBooking[];
};

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function getSeatGrade(row: string): SeatGrade {
  if (row === 'A') {
    return 'VIP';
  }

  if (row === 'B') {
    return 'R';
  }

  return 'S';
}

function mapSeat(seat: ApiSeat): Seat {
  return {
    id: seat.id,
    grade: getSeatGrade(seat.row),
    price: seat.price,
    status: seat.status === 'BOOKED' ? 'booked' : 'available',
  };
}

function mapConcert(concert: ApiConcert, seats: Seat[]): Concert {
  return {
    id: concert.id,
    title: concert.title,
    dateTime: formatDateTime(concert.date),
    venue: concert.venue,
    seats,
  };
}

function mapBooking(booking: ApiBooking): Booking {
  return {
    id: booking.id,
    concertId: booking.concertId,
    concertTitle: booking.concertTitle,
    seats: booking.seatIds,
    totalPrice: booking.totalPrice,
    booker: getCurrentUser()?.name ?? booking.userId,
    bookedAt: formatDateTime(booking.createdAt),
  };
}

export async function getConcerts(): Promise<Concert[]> {
  const response = await apiRequest<ApiConcertListResponse>('/concerts?status=OPEN&page=1&size=100');
  const concertsWithSeats = await Promise.all(
    response.concerts.map(async (concert) => {
      const seatsResponse = await apiRequest<ApiSeatListResponse>(`/concerts/${concert.id}/seats`);
      return mapConcert(concert, seatsResponse.seats.map(mapSeat));
    }),
  );

  return concertsWithSeats;
}

export async function createBooking(concertId: string, seatIds: string[]): Promise<Booking> {
  const booking = await apiRequest<ApiBooking>('/bookings', {
    method: 'POST',
    auth: true,
    body: JSON.stringify({ concertId, seatIds }),
  });

  return mapBooking(booking);
}

export async function getMyBookings(): Promise<Booking[]> {
  const response = await apiRequest<ApiBookingListResponse>('/bookings/me', { auth: true });
  return response.bookings.map(mapBooking);
}
