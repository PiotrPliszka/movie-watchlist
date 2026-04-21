import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import "./MovieDetails.css";

export function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`movies/${id}/`);
        console.log("Sukces: ", response.data);
        setMovieDetails(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Dane błędu: ", error.response.data);
        } else {
          console.error("Błąd Ogólny: ", error.message);
        }
      }
    }

    fetchData();
  }, [id]);

  if (!movieDetails) {
    return <div className="movie-container">Ładowanie danych filmu...</div>;
  }

  return (
    <div className="movie-container">
      <div className="nav">
        <div className="title">
          <h1>{movieDetails.title}</h1>
        </div>
        <div className="btn">
          <Link to={"/"}>Home</Link>
          <Link to={"movies/"}>Movie List</Link>
        </div>
        <div className="meta">{movieDetails.release_year}</div>
        <div className="desc">{movieDetails.description}</div>
      </div>
    </div>
  );
}
