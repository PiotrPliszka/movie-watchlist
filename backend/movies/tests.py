from rest_framework.test import APITestCase
from rest_framework import status
from .models import Movie
import datetime


# Create your tests here.
class MovieAPITests(APITestCase):
    def setUp(self):
        self.movie = Movie.objects.create(
            title="The Matrix",
            description="Sci-Fi classic",
            release_year=datetime.date(1999, 3, 31),
            is_watched=False,
        )
        self.url = "/api/movies/"

    def test_get_movie_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_movie(self):
        payload = {
            "title": "Inception",
            "description": "Dream within a dream",
            "release_year": "2010-07-16",
            "is_watched": True,
        }
        response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Movie.objects.count(), 2)

    def test_update_movie_partially(self):
        response = self.client.patch(
            f"{self.url}{self.movie.id}/", {"is_watched": True}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_movie(self):
        response = self.client.delete(f"{self.url}{self.movie.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Movie.objects.count(), 0)
