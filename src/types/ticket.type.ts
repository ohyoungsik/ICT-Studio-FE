export type SeatGrade = 'VIP' | 'R' | 'S';

export type SeatStatus = 'available' | 'booked';

export type Seat = {
  id: string;
  grade: SeatGrade;
  price: number;
  status: SeatStatus;
};

export type Concert = {
  id: string;
  title: string;
  dateTime: string;
  venue: string;
  seats: Seat[];
};

export type Booking = {
  id: string;
  concertId: string;
  concertTitle: string;
  seats: string[];
  totalPrice: number;
  booker: string;
  bookedAt: string;
};

export type BookingDraft = {
  concertId: string;
  seats: string[];
};
