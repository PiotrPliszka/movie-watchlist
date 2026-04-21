import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./AddMovie.css";

export function AddMovie() {
  return (
    <div className="form-container">
      <div className="form-topbar">
        <Link to="/" className="home-btn">
          Home
        </Link>
      </div>
      <form className="form">
        <label>Title</label>
        <input type="text" />
        <label>Description</label>
        <textarea className="description-input" rows="10" />
        <label>Relese year</label>
        <input
          type="text"
          className="date-input"
          placeholder="YYYY-MM-DD"
          inputMode="numeric"
          pattern="\d{4}-\d{2}-\d{2}"
          title="Format: YYYY-MM-DD"
        />
        <label>Is watched</label>
        <label className="watched-row">
          <input type="checkbox" />
          <span>Mark as watched</span>
        </label>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}
