from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import ScoreSerializer
from .models import score


class ScoreViewSet(viewsets.ModelViewSet):
    queryset = score.objects.all().order_by('-date')
    serializer_class = ScoreSerializer

    # POST /api/scores/<id>/add/
    @action(detail=True, methods=["post"])
    def add(self, request, pk=None):
        score_obj = self.get_object()
        value = int(request.data.get("value", 0))

        score_obj.score += value
        score_obj.save()

        serializer = self.get_serializer(score_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST /api/scores/reset/
    @action(detail=False, methods=["post"])
    def reset(self, request):
        score.objects.update(score=0)
        return Response(
            {"message": "Scores reset"},
            status=status.HTTP_200_OK
        )
