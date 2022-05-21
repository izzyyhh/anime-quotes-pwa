import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Favorite from "./components/Favorite";
import { useEffect, useState } from "react";

var deferredPrompt;

window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  deferredPrompt = e;
  return false;
});

const triggerInstall = () => {
  if (deferredPrompt !== undefined) {
    // The user has had a positive interaction with our app and Chrome
    // has tried to prompt previously, so let's show the prompt.
    deferredPrompt.prompt();

    // Follow what the user has done with the prompt.
    deferredPrompt.userChoice.then(function (choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome == "dismissed") {
        console.log("User cancelled home screen install");
      } else {
        console.log("User added to home screen");
      }

      // We no longer need the prompt.  Clear it up.
      deferredPrompt = null;
    });
  }
};

const sendThemeMessage = () => {
  if ("serviceWorker" in navigator) {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    navigator.serviceWorker.controller.postMessage({
      name: "ToogleTheme",
      color: randomColor,
    });
  } else {
    console.log("ffs");
  }
};

function App() {
  const [favQuotes, setFavQuotes] = useState([]);
  useEffect(() => {
    let favs = JSON.parse(window.localStorage.getItem("favs"));
    if (favs === null) {
      favs = [];
    }
    setFavQuotes(favs);
  }, []);

  return (
    <div className="wrapper">
      <div className="App" id="appBody">
        <Header></Header>
        <button onClick={triggerInstall}>Install with prompt</button>
        <button onClick={sendThemeMessage}>
          Change Theme across Windows/Tabs
        </button>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Feed favQuotes={favQuotes} setFavQuotes={setFavQuotes} />
              }
            ></Route>
            <Route
              path="fav"
              element={
                <Favorite favQuotes={favQuotes} setFavQuotes={setFavQuotes} />
              }
            ></Route>
          </Routes>
          <div className="App-links">
            <Link to="/">Feed</Link>
            <Link to="/fav">Favorites</Link>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
