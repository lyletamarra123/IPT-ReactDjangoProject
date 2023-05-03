from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    college = models.CharField(max_length=100)
    degree_program = models.CharField(max_length=100)
    year_level = models.CharField(max_length=100)