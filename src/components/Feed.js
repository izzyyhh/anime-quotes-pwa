import { useEffect, useState } from "react";
import QuoteItem from "./QuoteItem";

function Feed({ favQuotes, setFavQuotes }) {
  let [feedQuotes, setFeedQuotes] = useState([
    {
      anime: "Progressive Web App",
      quote: "Patience is the key!",
      character: "izzy",
    },
  ]);

  useEffect(() => {
    fetch("https://animechan.vercel.app/api/quotes")
      .then((response) => response.json())
      .then((quotes) => {
        setFeedQuotes([...feedQuotes, ...quotes]);
      });
  }, []);

  return (
    <section className="App-home">
      <h2 style={{ textAlign: "center" }}>Quotes Feed</h2>
      <div className="App-feed">
        {feedQuotes.map((q) => (
          <QuoteItem
            key={Date.now() + Math.random(0, 10000).toString()}
            anime={q.anime}
            character={q.character}
            quote={q.quote}
            setFavQuotes={setFavQuotes}
          />
        ))}
      </div>
    </section>
  );
}

export default Feed;
