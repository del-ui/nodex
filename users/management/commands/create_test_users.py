from django.core.management.base import BaseCommand
from users.models import User

class Command(BaseCommand):
    help = 'Create 2 reporters and 2 technicians for testing'

    def handle(self, *args, **kwargs):
        users_data = [
            {"username": "reporter1", "password": "reporter1", "role": "REPORTER"},
            {"username": "reporter2", "password": "reporter2", "role": "REPORTER"},
            {"username": "tech1", "password": "tech1", "role": "TECHNICIAN"},
            {"username": "tech2", "password": "tech2", "role": "TECHNICIAN"},
        ]

        for data in users_data:
            if not User.objects.filter(username=data["username"]).exists():
                User.objects.create_user(
                    username=data["username"],
                    password=data["password"],
                    role=data["role"]
                )
                self.stdout.write(self.style.SUCCESS(f'Created user {data["username"]} ({data["role"]})'))
            else:
                self.stdout.write(self.style.WARNING(f'User {data["username"]} already exists'))

        self.stdout.write(self.style.SUCCESS('✅ Test users setup complete!'))
