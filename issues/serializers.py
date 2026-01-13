from rest_framework import serializers
from .models import Issue

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'
        read_only_fields = ('created_by', 'created_at', 'updated_at')


class IssueAnalyticsSerializer(serializers.Serializer):
    reporter = serializers.ReadOnlyField(source='reporter.username')
    total_issues = serializers.IntegerField()
    open_issues = serializers.IntegerField()
    assigned_issues = serializers.IntegerField()
    resolved_issues = serializers.IntegerField()
