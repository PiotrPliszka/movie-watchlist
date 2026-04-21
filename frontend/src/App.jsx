import React from "react";
import { Routes, Route } from "react-router-dom";
import { MovieList } from "./pages/MovieList";
import { HomePage } from "./pages/HomePage";
import { MovieDetails } from "./pages/MovieDetails";
import { AddMovie } from "./pages/AddMovie";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MovieList />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/movies/add-movie" element={<AddMovie />} />
    </Routes>
  );
}

export default App;
