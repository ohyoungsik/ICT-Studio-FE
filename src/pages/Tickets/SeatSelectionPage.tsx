import React from 'react';
import type { Concert, Seat, SeatGrade } from '../../types/ticket.type';

type SeatSelectionPageProps = {
  concert: Concert;
  onBack: () => void;
  onProceed: (selectedSeats: string[]) => void;
};

const seatGrades: SeatGrade[] = ['VIP', 'R', 'S'];

function formatCurrency(value: number) {
  return `${value.toLocaleString('ko-KR')}원`;
}

function getTotalPrice(seats: Seat[], selectedSeatIds: string[]) {
  return seats
    .filter((seat) => selectedSeatIds.includes(seat.id))
    .reduce((total, seat) => total + seat.price, 0);
}

export function SeatSelectionPage({ concert, onBack, onProceed }: SeatSelectionPageProps) {
  const [selectedSeatIds, setSelectedSeatIds] = React.useState<string[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const totalPrice = getTotalPrice(concert.seats, selectedSeatIds);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'booked') {
      return;
    }

    setSelectedSeatIds((currentSeats) =>
      currentSeats.includes(seat.id)
        ? currentSeats.filter((seatId) => seatId !== seat.id)
        : [...currentSeats, seat.id],
    );
  };

  return (
    <main className="booking-page">
      <section className="booking-heading">
        <button type="button" onClick={onBack}>
          목록으로
        </button>
        <div>
          <p>Seat Selection</p>
          <h1>{concert.title}</h1>
          <span>
            {concert.dateTime} · {concert.venue}
          </span>
        </div>
      </section>

      <section className="booking-grid">
        <div className="seat-map" aria-label="좌석 선택">
          <div className="stage">STAGE</div>

          {seatGrades.map((grade) => (
            <div className="seat-row" key={grade}>
              <h2>{grade}</h2>
              <div className="seat-row__buttons">
                {concert.seats
                  .filter((seat) => seat.grade === grade)
                  .map((seat) => {
                    const isSelected = selectedSeatIds.includes(seat.id);

                    return (
                      <button
                        className={[
                          'seat-button',
                          seat.status === 'booked' ? 'is-booked' : '',
                          isSelected ? 'is-selected' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        disabled={seat.status === 'booked'}
                        key={seat.id}
                        type="button"
                        onClick={() => toggleSeat(seat)}
                      >
                        {seat.id}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}

          <div className="seat-legend" aria-label="좌석 상태">
            <span>
              <i className="legend-available" /> 선택 가능
            </span>
            <span>
              <i className="legend-booked" /> 예매 완료
            </span>
            <span>
              <i className="legend-selected" /> 현재 선택
            </span>
          </div>
        </div>

        <aside className="booking-summary" aria-label="선택 정보">
          <p>선택 정보</p>
          <h2>선택 좌석</h2>
          {selectedSeatIds.length > 0 ? (
            <ul>
              {selectedSeatIds.map((seatId) => (
                <li key={seatId}>{seatId}</li>
              ))}
            </ul>
          ) : (
            <span className="empty-text">좌석을 선택해주세요.</span>
          )}

          <div className="summary-total">
            <span>총 금액</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </div>

          <button
            disabled={selectedSeatIds.length === 0}
            type="button"
            onClick={() => setIsConfirmModalOpen(true)}
          >
            예매 진행
          </button>
        </aside>
      </section>

      {isConfirmModalOpen ? (
        <div
          className="booking-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-request-title"
        >
          <button
            className="booking-modal__backdrop"
            type="button"
            aria-label="예매 확인 닫기"
            onClick={() => setIsConfirmModalOpen(false)}
          />
          <section className="booking-modal__panel booking-request-modal">
            <p>Booking</p>
            <h2 id="booking-request-title">예매하시겠습니까?</h2>
            <dl className="confirm-list">
              <div>
                <dt>공연명</dt>
                <dd>{concert.title}</dd>
              </div>
              <div>
                <dt>선택 좌석</dt>
                <dd>{selectedSeatIds.join(', ')}</dd>
              </div>
              <div>
                <dt>총 금액</dt>
                <dd>{formatCurrency(totalPrice)}</dd>
              </div>
            </dl>
            <div className="booking-modal__actions">
              <button type="button" onClick={() => setIsConfirmModalOpen(false)}>
                취소
              </button>
              <button type="button" onClick={() => onProceed(selectedSeatIds)}>
                예매
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
