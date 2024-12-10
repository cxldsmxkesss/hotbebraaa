import React from "react";
import { Link } from "react-router-dom";

import img404 from "../assets/404.png";
import "./styles/NotFoundPage.css";


function NotFoundPage(props) {
  return (
    <main id="not-found-page-main">
      <img src={img404} id="img-404" alt="img-404" title="404 - Page Not Found" />
      <h2>Page Not Found</h2>
      <Link to="/">
        <p>Back to Homepage</p>
      </Link>
    </main>
  )
}

export default NotFoundPage;