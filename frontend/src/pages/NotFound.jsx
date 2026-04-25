import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div>
      <p>Nie znaleziono takiej strony</p>
      <Link to={"/"}>Home</Link>
    </div>
  );
}
