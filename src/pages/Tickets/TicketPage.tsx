import type { Concert } from '../../types/ticket.type';

type TicketPageProps = {
  concerts: Concert[];
  onBook: (concertId: string) => void;
};

export function TicketPage({ concerts, onBook }: TicketPageProps) {
  return (
    <main className="tickets-page">
      <section className="tickets-heading">
        <p>Concert Ticketing</p>
        <h1>예매 가능한 공연</h1>
      </section>

      <section className="ticket-list" aria-label="공연 목록">
        {concerts.map((concert) => (
          <article className="ticket-item" key={concert.id}>
            <div className="ticket-item__content">
              <h2>{concert.title}</h2>
              <dl>
                <div>
                  <dt>일시</dt>
                  <dd>{concert.dateTime}</dd>
                </div>
                <div>
                  <dt>장소</dt>
                  <dd>{concert.venue}</dd>
                </div>
              </dl>
            </div>
            <button type="button" onClick={() => onBook(concert.id)}>
              예매하기
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
