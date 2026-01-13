from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.permissions import IsAdminUser
from .models import User

# Endpoint to get current logged-in user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def technicians_list(request):
    technicians = User.objects.filter(role="TECHNICIAN")
    data = [{"id": t.id, "username": t.username} for t in technicians]
    return Response(data)