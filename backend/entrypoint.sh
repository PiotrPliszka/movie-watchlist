#!/bin/sh
set -e

echo "Applying migrations..."
python manage.py migrate

echo "Seeding test movies..."
python seed_test_movies.py

echo "Starting Django server..."
exec python manage.py runserver 0.0.0.0:8000
