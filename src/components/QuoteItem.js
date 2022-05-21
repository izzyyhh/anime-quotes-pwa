const handleShare = (data) => {
  if (navigator.share) {
    navigator
      .share({
        title: data.title,
        text: data.text,
        url: window.location.href,
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  }
};

const handleLike = (quote, setFavQuotes) => {
  let favs = JSON.parse(window.localStorage.getItem("favs"));
  if (favs === null) {
    favs = [];
  }
  const newFavs = [...favs, quote];
  window.localStorage.setItem("favs", JSON.stringify(newFavs));
  setFavQuotes(newFavs);
};

function QuoteItem({ anime, character, quote, disabledLike, setFavQuotes }) {
  return (
    <div className="App-quote">
      <p>{quote}</p>
      <h4>
        – {character} from {anime}
      </h4>
      <div className="quote-actions">
        <button
          onClick={() => handleLike({ anime, character, quote }, setFavQuotes)}
          disabled={disabledLike}
        >
          Like/Remember
        </button>
        <button
          onClick={() =>
            handleShare({
              title: "Anime Quotes",
              text: quote + "\n -" + character,
            })
          }
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default QuoteItem;
