import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./MovieList.css";
import { Link } from "react-router-dom";

export function MovieList() {
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [movies, setMovies] = useState([]);
  const movieToBeDeleted = movies.find((movie) => movie.id === movieToDelete);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("movies/");
        setMovies(response.data);
      } catch (error) {
        setApiError("Failed to download movie library");
        if (error.response) {
          console.error("Error data: ", error.response.data);
        } else {
          console.log("Error message: ", error.message);
        }
      }
    }

    fetchData();
  }, []);

  async function deleteMovie(id) {
    setApiError("");
    try {
      const response = await api.delete(`movies/${id}/`);

      const refresh = movies.filter((movie) => movie.id != id);
      setMovies(refresh);
    } catch (error) {
      setApiError("Failed to delete selected movie");
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
    }
  }

  function handleConfirmDelete() {
    if (movieToDelete) {
      deleteMovie(movieToDelete);
      setMovieToDelete(null);
    }
  }

  function handleCancelDelete() {
    setMovieToDelete(null);
  }

  const filteredMovies = movies
    .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
    .filter((movie) => {
      if (statusFilter === "watched") {
        return movie.is_watched;
      }

      if (statusFilter === "unwatched") {
        return !movie.is_watched;
      }

      return true;
    });

  return (
    <div className="movie-list-div">
      <div className="nav">
        <h1>
          <Link to={"/"}>MovieList</Link>
        </h1>
        <input
          type="text"
          placeholder="Search by title..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div className="filter-switch">
          <button
            type="button"
            className={
              statusFilter === "all" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={
              statusFilter === "watched" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setStatusFilter("watched")}
          >
            Watched
          </button>
          <button
            type="button"
            className={
              statusFilter === "unwatched" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setStatusFilter("unwatched")}
          >
            Unwatched
          </button>
        </div>
        <Link to={"add-movie"} className="add-btn">
          Add
        </Link>
      </div>

      <div className="list-header">
        <div>
          <p className="eyebrow">Library</p>
          <h2>Your movies</h2>
          {apiError && <p className="api-error">{apiError}</p>}
        </div>
        <div className="movie-count">{filteredMovies.length} titles</div>
      </div>

      <div className="grid">
        {movies.length == 0 && (
          <p className="empty-movie-list">List is empty add some movies</p>
        )}
        {filteredMovies.map((item) => (
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
                  setMovieToDelete(item.id);
                }}
              >
                🗑️
              </button>
            </div>
          </article>
        ))}
      </div>

      {movieToDelete && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Are you sure you want to delete {movieToBeDeleted.title}?</h3>
            <p>This action cannot be undone</p>
            <div className="dialog-actions">
              <button onClick={handleCancelDelete} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="confirm-del-btn">
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
