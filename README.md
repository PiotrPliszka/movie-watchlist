# 🎬 Movie Watchlist - Projekt Treningowy (React + Django REST)

## 📖 O projekcie
Ten projekt to w pełni funkcjonalna aplikacja typu CRUD (Create, Read, Update, Delete) służąca do zarządzania osobistą listą filmów do obejrzenia. 

Głównym celem powstania tej aplikacji jest praktyczna nauka integracji frontendu (React) z backendem (Django REST Framework) z pominięciem autoryzacji (logowania), co pozwala skupić się w 100% na przepływie danych i routingu.

## 🛠️ Technologie
* **Frontend:** React, React Router v6, Axios
* **Backend:** Python, Django, Django REST Framework
* **Baza danych:** SQLite (domyślna dla Django)

## ✨ Funkcjonalności
* Wyświetlanie listy wszystkich filmów z bazy danych.
* Dynamiczny routing – dedykowana podstrona ze szczegółami każdego filmu.
* Formularz dodawania nowego tytułu do bazy.
* Możliwość oznaczania filmu jako "Obejrzany" (aktualizacja danych).
* Możliwość trwałego usunięcia filmu z bazy.

---

## 🗺️ Plan Działania (Roadmap)

### Etap 1: Backend (Django REST Framework)
- [ ] Zbudowanie modelu `Movie` (pola: `title`, `description`, `release_year`, `is_watched`).
- [ ] Wykonanie migracji bazy danych (`makemigrations` i `migrate`).
- [ ] Stworzenie `MovieSerializer` dla zamiany modelu na JSON.
- [ ] Konfiguracja `ModelViewSet` w pliku `views.py` do obsługi operacji CRUD.
- [ ] Podpięcie widoku pod `urls.py` przy użyciu routera DRF.
- [ ] Ręczne przetestowanie API w przeglądarce pod adresem `http://localhost:8000/api/movies/`.
- [ ] Skonfigurowanie biblioteki `django-cors-headers`, aby React mógł bezpiecznie łączyć się z API.

### Etap 2: Frontend (Szkielet i Routing w React)
- [ ] Inicjalizacja projektu React i instalacja paczek: `npm install react-router-dom axios`.
- [ ] Utworzenie pustych komponentów: `MoviesList`, `AddMovie`, `MovieDetails`.
- [ ] Konfiguracja głównego routingu w `App.jsx` (trasy: `/`, `/add`, `/movie/:id`).

### Etap 3: Łączenie frontendu z API (Operacje CRUD)
- [ ] **Read (Lista):** W `MoviesList` użycie `useEffect` i `axios.get` do pobrania filmów i wyświetlenia ich na ekranie.
- [ ] **Nawigacja:** Dodanie linków `<Link>` przy każdym filmie, prowadzących do `/movie/:id`.
- [ ] **Create (Dodawanie):** W `AddMovie` stworzenie formularza wysyłającego `axios.post` i użycie `useNavigate` do powrotu na listę.
- [ ] **Read (Szczegóły):** W `MovieDetails` użycie `useParams` do pobrania ID z URL i `axios.get`, aby załadować detale jednego filmu.
- [ ] **Update (Edycja):** Dodanie w szczegółach przycisku wywołującego `axios.patch`, który zmienia status `is_watched` na `True`.
- [ ] **Delete (Usuwanie):** Dodanie przycisku wywołującego `axios.delete`, a następnie automatyczne wyrzucenie użytkownika na stronę główną (`useNavigate`).

---
