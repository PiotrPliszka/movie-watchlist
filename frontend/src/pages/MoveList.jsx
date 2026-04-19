import React, { useState, useEffect } from "react";
import api from "../api/axios";

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
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="movie-list-div">
      <h1>MovieList</h1>
      <ul>
        {movies.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
