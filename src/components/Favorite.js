import QuoteItem from "./QuoteItem";

function Favorite({ favQuotes }) {
  return (
    <section className="App-home">
      <div>
        <h2 style={{ textAlign: "center" }}>Favorite Quotes</h2>
      </div>
      <div className="App-feed">
        {favQuotes.map((quote) => (
          <QuoteItem
            anime={quote.anime}
            quote={quote.quote}
            character={quote.character}
            disabledLike={true}
            key={Date.now() + Math.random(0, 10000).toString()}
          ></QuoteItem>
        ))}
      </div>
    </section>
  );
}

export default Favorite;
