import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import PuzzlePage from "./pages/PuzzlePage.js";
import NotFoundPage from "./pages/NotFoundPage.js";

import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";




class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/puzzle/:size/:seed" element={ <PuzzlePage /> } />
          <Route path="*" element={ <NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;