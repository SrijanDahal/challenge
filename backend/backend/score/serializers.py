from rest_framework import serializers
from .models import score

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = score
        fields = ('id', 'name', 'score', 'date')
        