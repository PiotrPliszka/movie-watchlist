import os
from datetime import date

import django


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from movies.models import Movie  # noqa: E402


TEST_MOVIES = [
    {
        "title": "Inception",
        "description": "A thief enters dreams to steal corporate secrets.",
        "release_year": date(2010, 7, 16),
        "is_watched": True,
    },
    {
        "title": "Interstellar",
        "description": "A space mission seeks a new home for humanity.",
        "release_year": date(2014, 11, 7),
        "is_watched": False,
    },
    {
        "title": "Blade Runner 2049",
        "description": "A new blade runner uncovers a long-buried secret.",
        "release_year": date(2017, 10, 6),
        "is_watched": False,
    },
    {
        "title": "The Dark Knight",
        "description": "Batman faces Joker in Gotham City.",
        "release_year": date(2008, 7, 18),
        "is_watched": True,
    },
    {
        "title": "Arrival",
        "description": "A linguist works to communicate with alien visitors.",
        "release_year": date(2016, 11, 11),
        "is_watched": False,
    },
]


def seed_movies():
    created = 0
    updated = 0

    for item in TEST_MOVIES:
        movie, was_created = Movie.objects.update_or_create(
            title=item["title"],
            defaults={
                "description": item["description"],
                "release_year": item["release_year"],
                "is_watched": item["is_watched"],
            },
        )
        if was_created:
            created += 1
            print(f"[CREATED] {movie.title}")
        else:
            updated += 1
            print(f"[UPDATED] {movie.title}")

    print(f"\nDone. Created: {created}, Updated: {updated}, Total in DB: {Movie.objects.count()}")


if __name__ == "__main__":
    seed_movies()
