import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./AddMovie.css";

export function AddMovie() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ titleError: "", dateError: "" });
  const [apiError, setApiError] = useState("");
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    release_year: "",
    is_watched: false,
  });
  function handleChange(e) {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = { titleError: "", dateError: "" };

    if (movie.title.length < 3) {
      nextErrors.titleError = "Title is too short";
    }

    if (movie.release_year === "") {
      nextErrors.dateError = "You must set date";
    }

    if (nextErrors.titleError || nextErrors.dateError) {
      setError(nextErrors);
      return;
    }

    setError({ titleError: "", dateError: "" });
    setApiError("");

    setIsLoading(true);
    try {
      const response = await api.post("movies/", movie);
      resetForm();
      navigate("/movies");
    } catch (error) {
      setApiError("Wystąpił błąd serwera. Nie udało się dodać filmu.");
      if (error.response) {
        console.error("Dane błędu: ", error.response.data);
      } else {
        console.error("Bład ogólny: ", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setMovie({
      title: "",
      description: "",
      release_year: "",
      is_watched: false,
    });
  }

  return (
    <div className="form-container">
      <div className="form-topbar">
        <Link to="/" className="home-btn">
          Home
        </Link>
        <Link to={"/movies"} className="home-btn">
          Movies
        </Link>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {apiError && <p className="api-error">{apiError}</p>}
        <label>Title</label>
        <input
          type="text"
          onChange={handleChange}
          value={movie.title}
          name="title"
        />
        {error.titleError && <p className="form-error">{error.titleError}</p>}
        <label>Description</label>
        <textarea
          className="description-input"
          rows="10"
          onChange={handleChange}
          value={movie.description}
          name="description"
        />
        <label>release_year</label>
        <input
          type="date"
          className="date-input"
          inputMode="numeric"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          title="Format: YYYY-MM-DD"
          onChange={handleChange}
          value={movie.release_year}
          name="release_year"
        />
        {error.dateError && <p className="form-error">{error.dateError}</p>}
        <label>Is watched</label>
        <label className="watched-row">
          <input
            type="checkbox"
            onChange={() =>
              setMovie({ ...movie, is_watched: !movie.is_watched })
            }
            name="is_watched"
            checked={movie.is_watched}
          />
          <span>Mark as watched</span>
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "ADDING..." : "ADD"}
        </button>
      </form>
    </div>
  );
}
