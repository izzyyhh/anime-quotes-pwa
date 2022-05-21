import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Favorite from "./components/Favorite";
import { useState } from "react";

function App() {
  const [favQuotes, setFavQuotes] = useState([]);

  return (
    <div className="wrapper">
      <div className="App">
        <Header></Header>
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
