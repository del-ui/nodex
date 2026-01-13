from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Issue
from .serializers import IssueSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:  # Admin sees all
            return Issue.objects.all()
        elif user.role == 'TECHNICIAN':
            # Technicians see assigned issues
            return Issue.objects.filter(assigned_to=user)
        else:
            # Reporters see their own issues
            return Issue.objects.filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        serializer.save(reporter=self.request.user)

    def perform_update(self, serializer):
        issue = self.get_object()
        user = self.request.user

        # Only admin can assign issues
        if 'assigned_to' in self.request.data and not user.is_staff:
            raise PermissionDenied("Only admin can assign issues.")

        # Only assigned technician can resolve
        if serializer.validated_data.get('status') == 'resolved':
            if user != issue.assigned_to and not user.is_staff:
                raise PermissionDenied("Only assigned technician or admin can resolve this issue.")

        serializer.save()

@api_view(['GET'])
@permission_classes([IsAdminUser])
def issue_analytics(request):
    """
    Admin-only endpoint to get summary stats for issues.
    """
    total = Issue.objects.count()
    open_count = Issue.objects.filter(status='open').count()
    assigned_count = Issue.objects.filter(status='assigned').count()
    resolved_count = Issue.objects.filter(status='resolved').count()

    data = {
        'total_issues': total,
        'open_issues': open_count,
        'assigned_issues': assigned_count,
        'resolved_issues': resolved_count,
    }

    return Response(data)


