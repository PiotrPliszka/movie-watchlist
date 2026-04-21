import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./MovieList.css";
import { Link, Links } from "react-router-dom";

export function MovieList() {
  // dynamic data from database
  const [movies, setMovies] = useState([]);

  // useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("movies/");
        console.log("Sukces:", response.data);
        setMovies(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Dane błędu: ", error.response.data);
        } else {
          console.log("Błąd ogólny: ", error.message);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <div className="movie-list-div">
      <div className="nav">
        <h1>
          <Link to={"/"}>MovieList</Link>
        </h1>
        <Link to={"add-movie"} className="add-btn">
          Add
        </Link>
      </div>

      <div className="grid">
        {movies.map((item) => (
          <Link key={item.id} to={`${item.id}`}>
            <div className="card">
              <div className="title">{item.title}</div>
              <div className="meta">{item.release_year}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
