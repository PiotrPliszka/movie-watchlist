from rest_framework import serializers
import datetime
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"

    def validate_title(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Title is shorter than 3")
        return value
