from django.urls import path
from .views import MovieListCreateView, MovieDetailView

urlpatterns = [
    # List Movies endpoint
    path('movies/', MovieListCreateView.as_view(), name='movie-list'),
    
    # Movie Detail endpoint
    path('movies/<int:pk>/', MovieDetailView.as_view(), name='movie-detail'),
]