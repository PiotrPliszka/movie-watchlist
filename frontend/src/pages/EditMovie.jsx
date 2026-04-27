import React, { useEffect, useState } from "react";
import "./EditMovie.css";
import api from "../api/axios";
import { useParams, Link, useNavigate } from "react-router-dom";

export function EditMovie() {
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState({ titleError: "", dateError: "" });
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    description: "",
    release_year: "",
    is_watched: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`movies/${id}/`);
        setMovie(response.data);
      } catch (error) {
        setApiError("Failed to download movie data");
        if (error.response) {
          console.error(error.response.data);
        } else {
          console.error(error.message);
        }
      } finally {
        setIsFetching(false);
      }
    }
    fetchData();
  }, [id]);

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

    setIsSubmitting(true);
    try {
      const response = await api.patch(`movies/${id}/`, movie);
      navigate("/movies");
    } catch (error) {
      setApiError("There was an error saving changes. Please try again.");
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isFetching) {
    return <div className="form-container">Loading movie data...</div>;
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
        {apiError && <p className="form-error">{apiError}</p>}
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Edit"}
        </button>
      </form>
    </div>
  );
}
