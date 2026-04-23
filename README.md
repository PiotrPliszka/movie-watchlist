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

## Development Roadmap

Below is a practical roadmap for turning this project into a solid portfolio-ready CRUD application.

### Stage 1 - Core CRUD Completion

1. Finish the full `AddMovie` flow with working submit, validation, and redirect after success.
2. Add an `EditMovie` page with prefilled form data and update support.
3. Add a quick `watched / not watched` toggle from the UI.
4. Improve the delete flow with a better confirmation modal and clean refresh behavior.

### Stage 2 - UX and Form Quality

5. Add loading states for list, details, and form submission.
6. Add user-friendly error states for failed API requests.
7. Add success feedback after create and update actions.
8. Add empty states when the database has no movies.

### Stage 3 - Better Movie Browsing

9. Add search by movie title.
10. Add filters such as `all`, `watched`, and `to watch`.
11. Add sorting by title or release date.
12. Improve the visual presentation of status, dates, and metadata.

### Stage 4 - Codebase Cleanup

13. Extract reusable UI parts such as buttons, modals, badges, and headers.
14. Clean up CSS naming to avoid collisions between pages.
15. Reduce duplicated layout and styling patterns across the frontend.

### Stage 5 - Backend Improvements

16. Improve serializer validation and API responses.
17. Add filtering and sorting support through query parameters.
18. Revisit model naming and field choices if needed.
19. Keep seed/test data as an official part of developer setup.

### Stage 6 - Testing

20. Add backend tests for `GET`, `POST`, `PATCH`, and `DELETE` movie endpoints.
21. Add frontend tests for critical flows such as listing, opening details, adding, and deleting.

### Stage 7 - Portfolio Polish

22. Add screenshots or GIF previews to the README.
23. Keep the UI fully responsive on desktop and mobile.
24. Clean up remaining small bugs, labels, and consistency issues.
25. Treat this project as a finished portfolio piece, then move on to a second full-stack app.

## Suggested Order of Work

If you want to build this project in a smart order, focus on:

1. Core CRUD completion
2. Loading, error, and empty states
3. Search, filters, and sorting
4. CSS and component cleanup
5. Backend filtering and validation
6. Tests
7. README polish and screenshots
