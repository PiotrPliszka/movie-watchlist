import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found-eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="not-found-copy">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="not-found-actions">
        <Link to={"/"} className="not-found-btn">
          Home
        </Link>
        <Link to={"/movies"} className="not-found-btn secondary">
          Movies
        </Link>
      </div>
    </div>
  );
}
