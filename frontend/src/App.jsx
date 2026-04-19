import React from "react";
import { Routes, Route } from "react-router-dom";
import { MovieList } from "./pages/MovieList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MovieList />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
