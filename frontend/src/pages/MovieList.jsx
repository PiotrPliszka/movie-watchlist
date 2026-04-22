import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./MovieList.css";
import { Link } from "react-router-dom";

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

  async function deleteMovie(id) {
    try {
      const response = await api.delete(`movies/${id}/`);
      console.log("Sukces: ", response.data);

      const refresh = movies.filter((movie) => movie.id != id);
      setMovies(refresh);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
    }
  }

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

      <div className="list-header">
        <div>
          <p className="eyebrow">Library</p>
          <h2>Your movies</h2>
        </div>
        <div className="movie-count">{movies.length} titles</div>
      </div>

      <div className="grid">
        {movies.map((item) => (
          <article className="card" key={item.id}>
            <Link to={`${item.id}`} className="card-link">
              <div className="data">
                <div className="title">{item.title}</div>
                <div className="meta">
                  <span>{item.release_year}</span>
                  <span
                    className={
                      item.is_watched ? "status watched" : "status pending"
                    }
                  >
                    {item.is_watched ? "Watched" : "To watch"}
                  </span>
                </div>
              </div>
            </Link>
            <div className="card-actions">
              <button
                className="del-btn"
                onClick={(e) => {
                  e.preventDefault();
                  deleteMovie(item.id);
                }}
              >
                🗑️
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
