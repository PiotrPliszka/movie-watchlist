import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./AddMovie.css";

export function AddMovie() {
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
    try {
      const response = await api.post("movies/", movie);
      console.log("Sukces: ", response.data);
      resetForm();
    } catch (error) {
      if (error.response) {
        console.error("Dane błędu: ", error.response.data);
      } else {
        console.error("Bład ogólny: ", error.message);
      }
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
      <form className="form">
        <label>Title</label>
        <input
          type="text"
          onChange={handleChange}
          value={movie.title}
          name="title"
        />
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
        <button type="submit" onClick={handleSubmit}>
          ADD
        </button>
      </form>
    </div>
  );
}
