import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import "./MovieDetails.css";

export function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`movies/${id}/`);
        console.log("Sukces: ", response.data);
        setMovieDetails(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("/404");
          return;
        }
        setApiError(
          "An unexpected error occurred. The video could not be loaded.",
        );
        if (error.response) {
          console.error("Error data: ", error.response.data);
        } else {
          console.error("Error message: ", error.message);
        }
      }
    }

    fetchData();
  }, [id]);

  if (apiError) {
    return (
      <div>
        <p>{apiError}</p>
        <Link to={"/movies"}>Back to movie list</Link>
      </div>
    );
  }
  if (!movieDetails) {
    return <div className="movie-container">Loading data...</div>;
  }

  return (
    <div className="movie-container">
      <div className="nav">
        <div className="top-row">
          <div className="title">
            <h1>{movieDetails.title}</h1>
          </div>
          <div className="btn">
            <Link to={"/"}>Home</Link>
            <Link to={"/movies"}>Movie List</Link>
            <Link to={`/movies/${id}/edit`}>Edit</Link>
          </div>
        </div>
        <div className="meta">{movieDetails.release_year}</div>
        <div className="desc">{movieDetails.description}</div>
      </div>
    </div>
  );
}
