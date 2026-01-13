from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Adjust fields to your User model
        fields = ['id', 'username', 'role', 'is_staff']

