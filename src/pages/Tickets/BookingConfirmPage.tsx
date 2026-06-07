import type { Booking, BookingDraft, Concert } from '../../types/ticket.type';

type BookingConfirmPageProps = {
  booking?: Booking | null;
  concert: Concert;
  draft?: BookingDraft | null;
  onBackToSeats: () => void;
  onComplete: () => void;
  onMyTickets: () => void;
};

function formatCurrency(value: number) {
  return `${value.toLocaleString('ko-KR')}원`;
}

function getTotalPrice(concert: Concert, seatIds: string[]) {
  return concert.seats
    .filter((seat) => seatIds.includes(seat.id))
    .reduce((total, seat) => total + seat.price, 0);
}

export function BookingConfirmPage({
  booking,
  concert,
  draft,
  onBackToSeats,
  onComplete,
  onMyTickets,
}: BookingConfirmPageProps) {
  const seatIds = booking?.seats ?? draft?.seats ?? [];
  const totalPrice = booking?.totalPrice ?? getTotalPrice(concert, seatIds);

  return (
    <main className="booking-page">
      <section className="confirm-card" aria-labelledby="booking-confirm-title">
        <p>예매 정보</p>
        <h1 id="booking-confirm-title">{booking ? '예매 상세' : '예매 확인'}</h1>

        {seatIds.length > 0 ? (
          <>
            <dl className="confirm-list">
              <div>
                <dt>공연명</dt>
                <dd>{concert.title}</dd>
              </div>
              <div>
                <dt>좌석</dt>
                <dd>{seatIds.join(', ')}</dd>
              </div>
              <div>
                <dt>가격</dt>
                <dd>{formatCurrency(totalPrice)}</dd>
              </div>
              <div>
                <dt>예매자</dt>
                <dd>{booking?.booker ?? '홍길동'}</dd>
              </div>
              {booking ? (
                <div>
                  <dt>예매일</dt>
                  <dd>{booking.bookedAt}</dd>
                </div>
              ) : null}
            </dl>

            {booking ? (
              <button type="button" onClick={onMyTickets}>
                내 예매 내역으로
              </button>
            ) : (
              <button type="button" onClick={onComplete}>
                예매 완료
              </button>
            )}
          </>
        ) : (
          <div className="confirm-empty">
            <p>선택된 좌석이 없습니다.</p>
            <button type="button" onClick={onBackToSeats}>
              좌석 선택으로 이동
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
