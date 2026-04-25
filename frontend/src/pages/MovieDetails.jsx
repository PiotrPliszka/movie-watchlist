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
          "Wystąpił nieoczekiwany błąd. Nie udało się załadować filmu.",
        );
        if (error.response) {
          console.error("Dane błędu: ", error.response.data);
        } else {
          console.error("Błąd Ogólny: ", error.message);
        }
      }
    }

    fetchData();
  }, [id]);

  if (apiError) {
    return (
      <div>
        <p>{apiError}</p>
        <Link to={"/movies"}>Wróć do listy filmów</Link>
      </div>
    );
  }
  if (!movieDetails) {
    return <div className="movie-container">Ładowanie danych filmu...</div>;
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
