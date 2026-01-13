from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_CHOICES = (
        ('REPORTER', 'Reporter'),
        ('TECHNICIAN', 'Technician'),
        ('ADMIN', 'Admin'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='REPORTER')
    department = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"

