import type { Booking, Concert, Seat, SeatGrade } from '../../types/ticket.type';

const seatPrices: Record<SeatGrade, number> = {
  VIP: 150000,
  R: 110000,
  S: 80000,
};

function createSeats(bookedSeatIds: string[]): Seat[] {
  return [
    ...['A1', 'A2', 'A3', 'A4'].map((id) => ({
      id,
      grade: 'VIP' as const,
      price: seatPrices.VIP,
      status: bookedSeatIds.includes(id) ? ('booked' as const) : ('available' as const),
    })),
    ...['B1', 'B2', 'B3', 'B4'].map((id) => ({
      id,
      grade: 'R' as const,
      price: seatPrices.R,
      status: bookedSeatIds.includes(id) ? ('booked' as const) : ('available' as const),
    })),
    ...['C1', 'C2', 'C3', 'C4'].map((id) => ({
      id,
      grade: 'S' as const,
      price: seatPrices.S,
      status: bookedSeatIds.includes(id) ? ('booked' as const) : ('available' as const),
    })),
  ];
}

export const concerts: Concert[] = [
  {
    id: 'ict-concert-2026',
    title: 'ICT Concert 2026',
    dateTime: '2026-07-01 19:00',
    venue: 'KSPO DOME',
    seats: createSeats(['A1', 'B3', 'C4']),
  },
  {
    id: 'cloud-festival',
    title: 'Cloud Festival',
    dateTime: '2026-08-10 18:00',
    venue: '잠실종합운동장',
    seats: createSeats(['A4', 'B2', 'C1']),
  },
  {
    id: 'devops-live',
    title: 'DevOps Live',
    dateTime: '2026-09-15 20:00',
    venue: '올림픽공원',
    seats: createSeats(['A3', 'B4', 'C2']),
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'booking-ict-001',
    concertId: 'ict-concert-2026',
    concertTitle: 'ICT Concert 2026',
    seats: ['A2', 'A3'],
    totalPrice: 300000,
    booker: '홍길동',
    bookedAt: '2026-06-07',
  },
  {
    id: 'booking-cloud-001',
    concertId: 'cloud-festival',
    concertTitle: 'Cloud Festival',
    seats: ['B1'],
    totalPrice: 110000,
    booker: '홍길동',
    bookedAt: '2026-06-10',
  },
];
