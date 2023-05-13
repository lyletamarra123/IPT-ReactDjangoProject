from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    college = models.CharField(max_length=100)
    degree_program = models.CharField(max_length=100)
    year_level = models.CharField(max_length=100)

class College(models.Model):
    title = models.CharField(primary_key=True, max_length=100)
    description = models.CharField(max_length=100, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['title'], name='unique_college_title'),
        ]

    def __str__(self):
        return self.title


class Subject(models.Model):
    offerCode = models.CharField(max_length=100, primary_key=True)
    course_number = models.CharField(max_length=1000)
    title = models.CharField(max_length=100, null=False)
    units = models.IntegerField()
    college_title = models.ForeignKey(College, on_delete=models.CASCADE, to_field='title', null=True, blank=True)

    def __str__(self):
        return self.title
