from django.shortcuts import render
from rest_framework import generics

from .models import Movie
from .serializers import MovieSerializer

# Create your views here.
class MovieListCreateView(generics.ListCreateAPIView):
    serializer_class = MovieSerializer
    
    # Fetching the list of movies from the DB
    def get_queryset(self):
        return Movie.objects.all()
    
    # Saving the new movie instance to the DB
    def perform_create(self, serializer):
        return serializer.save()

class MovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MovieSerializer
    
    # Fetching the list of movies from the DB
    def get_queryset(self):
        return Movie.objects.all()
    
    # Edit the movie instance from the DB
    def perform_update(self, serializer):
        return serializer.save()
    # Delete the movie instance from the DB
    def perform_destroy(self, instance):
        return instance.delete()

