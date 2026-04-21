# Movie Watchlist

A full-stack training project for managing a personal movie watchlist.
Frontend is built with React + Vite, backend with Django REST Framework.

## Tech Stack

- Frontend: React 19, Vite, React Router, Axios
- Backend: Django 6, Django REST Framework
- Database: SQLite
- Containerization: Docker, Docker Compose

## What You Can Do

- Browse all movies
- Open details for a selected movie
- Add a new movie
- Update and delete movie records through the API

## Project Structure

```text
movie-watchlist/
|- backend/            # Django + DRF API
|- frontend/           # React app
|- docker-compose.yml  # Local container setup
`- README.md
```

## API Overview

Base URL:

```text
http://localhost:8000/api/
```

Endpoints:

- `GET /movies/` - list movies
- `POST /movies/` - create movie
- `GET /movies/<id>/` - movie details
- `PUT /movies/<id>/` - full update
- `PATCH /movies/<id>/` - partial update
- `DELETE /movies/<id>/` - remove movie

Movie model fields:

- `title` (string, required)
- `description` (text)
- `release_year` (date, `YYYY-MM-DD`)
- `is_watched` (boolean)

## Frontend Routes

- `/` - home page
- `/movies` - movie list
- `/movies/:id` - movie details
- `/movies/add-movie` - add movie form

## Quick Start (Docker)

Requirements:

- Docker
- Docker Compose

Run:

```bash
docker compose up --build
```

App URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000/api/movies/`

## Quick Start (Local Dev)

### 1) Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` in project root (or update existing one):

```env
SECRET_KEY=your_secret_key_here
```

Run migrations and server:

```bash
python manage.py migrate
python manage.py runserver
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

- Frontend API client points to `http://localhost:8000/api/` (`frontend/src/api/axios.js`).
- If CORS issues appear in local setup, verify backend CORS settings.
- Current focus of this project is API + routing practice, without auth.

## Roadmap Ideas

- Form validation and error UX improvements
- Mark movie as watched directly from UI
- Search, filters, and sorting
- Pagination for large lists
- Tests (frontend + backend)
