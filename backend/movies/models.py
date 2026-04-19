from django.db import models

# Create your models here.
# Zbudowanie modelu `Movie` (pola: `title`, `description`, `release_year`, `is_watched`).
class Movie(models.Model):
    title = models.CharField(max_length=40, null=False)
    description = models.TextField(null=False, blank=True)
    release_year = models.DateField()
    is_watched = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
