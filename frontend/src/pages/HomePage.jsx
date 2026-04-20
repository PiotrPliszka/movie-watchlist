import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="container">
      <nav>
        <div>
          <h3>Movie App</h3>
        </div>
        <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/movies"}>Movies</Link>
        </div>
      </nav>
      <div className="main-content">
        <h1>Movie App</h1>
        <p>
          Projekt do nauki Reacta i pracy z API. Możesz przeglądać filmy,
          sprawdzać szczegóły i rozwijać swoje umiejętności frontendowe.
        </p>
        <Link to={"/movies"} className="btn">
          Przejdz do filmów
        </Link>
      </div>
    </div>
  );
}
