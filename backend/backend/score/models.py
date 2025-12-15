from django.db import models

# Create your models here.
class score(models.Model):
    name = models.CharField(max_length=100)
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.score} - {self.date}"