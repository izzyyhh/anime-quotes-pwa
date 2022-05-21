function QuoteItem({ anime, character, quote }) {
  return (
    <div className="App-quote">
      <p>{quote}</p>
      <h4>
        – {character} from {anime}
      </h4>
      <div className="quote-actions">
        <button>Remember</button>
        <button>Share</button>
      </div>
    </div>
  );
}

export default QuoteItem;
