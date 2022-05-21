import { useEffect } from "react";
import QuoteItem from "./QuoteItem";

function Feed({ favQuotes, setFavQuotes }) {
  useEffect(() => {
    // fetch("https://animechan.vercel.app/api/quotes")
    //   .then((response) => response.json())
    //   .then((quotes) => console.log(quotes));
  }, []);

  return (
    <section className="App-home">
      <div className="App-feed">
        <h2>Quotes Feed</h2>
        <QuoteItem
          anime={"Toaru Majutsu no Index"}
          character={"Haruki Aritomi"}
          quote={
            "The Idealist says, everyone is born equal. We are all of equal worth. The sportsman screams, no effort goes unrewarded. Work hard for your dreams! It's about how you play the game. Obviously all untrue."
          }
        ></QuoteItem>
      </div>
    </section>
  );
}

export default Feed;
