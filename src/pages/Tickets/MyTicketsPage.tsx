import React from 'react';
import type { Booking } from '../../types/ticket.type';

type MyTicketsPageProps = {
  bookings: Booking[];
};

function formatCurrency(value: number) {
  return `${value.toLocaleString('ko-KR')}원`;
}

export function MyTicketsPage({ bookings }: MyTicketsPageProps) {
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);

  return (
    <main className="tickets-page">
      <section className="tickets-heading">
        <p>My Tickets</p>
        <h1>내 예매 내역</h1>
      </section>

      <section className="ticket-list" aria-label="내 예매 목록">
        {bookings.map((booking) => (
          <article className="ticket-item" key={booking.id}>
            <div className="ticket-item__content">
              <h2>{booking.concertTitle}</h2>
              <dl>
                <div>
                  <dt>좌석</dt>
                  <dd>{booking.seats.join(', ')}</dd>
                </div>
                <div>
                  <dt>예매일</dt>
                  <dd>{booking.bookedAt}</dd>
                </div>
                <div>
                  <dt>금액</dt>
                  <dd>{formatCurrency(booking.totalPrice)}</dd>
                </div>
              </dl>
            </div>
            <button type="button" onClick={() => setSelectedBooking(booking)}>
              상세보기
            </button>
          </article>
        ))}
      </section>

      {selectedBooking ? (
        <div
          className="booking-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <button
            className="booking-modal__backdrop"
            type="button"
            aria-label="예매 상세 닫기"
            onClick={() => setSelectedBooking(null)}
          />
          <section className="booking-modal__panel">
            <div className="booking-modal__header">
              <div>
                <p>예매 상세</p>
                <h2 id="booking-modal-title">{selectedBooking.concertTitle}</h2>
              </div>
              <button type="button" onClick={() => setSelectedBooking(null)}>
                닫기
              </button>
            </div>

            <dl className="confirm-list">
              <div>
                <dt>좌석</dt>
                <dd>{selectedBooking.seats.join(', ')}</dd>
              </div>
              <div>
                <dt>예매일</dt>
                <dd>{selectedBooking.bookedAt}</dd>
              </div>
              <div>
                <dt>예매자</dt>
                <dd>{selectedBooking.booker}</dd>
              </div>
              <div>
                <dt>금액</dt>
                <dd>{formatCurrency(selectedBooking.totalPrice)}</dd>
              </div>
            </dl>
          </section>
        </div>
      ) : null}
    </main>
  );
}
