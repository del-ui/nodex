from rest_framework.routers import DefaultRouter
from .views import IssueViewSet
# issues/urls.py
from django.urls import path, include
from .views import issue_analytics
from users.views import current_user



router = DefaultRouter()
router.register(r'issues', IssueViewSet, basename='issue')

urlpatterns = router.urls

urlpatterns += [
    path('analytics/', issue_analytics, name='issue-analytics'),
   
]
