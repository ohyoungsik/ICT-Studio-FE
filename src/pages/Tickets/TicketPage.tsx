const tickets = [
  {
    title: 'ICT Concert 2026',
    date: '2026-07-01',
  },
  {
    title: 'Cloud Festival',
    date: '2026-08-10',
  },
  {
    title: 'DevOps Live',
    date: '2026-09-15',
  },
];

export function TicketPage() {
  return (
    <main className="tickets-page">
      <section className="tickets-heading">
        <p>Concert Ticketing</p>
        <h1>티켓 예매</h1>
      </section>

      <section className="ticket-list" aria-label="티켓 목록">
        {tickets.map((ticket) => (
          <article className="ticket-item" key={ticket.title}>
            <div>
              <h2>{ticket.title}</h2>
              <p>{ticket.date}</p>
            </div>
            <button type="button">예매하기</button>
          </article>
        ))}
      </section>
    </main>
  );
}
