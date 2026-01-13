from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import current_user, technicians_list
from django.http import JsonResponse

def root(request):
    return JsonResponse({"message": "Welcome to NODEX API"})

urlpatterns = [
    path('', root),
    path('admin/', admin.site.urls),

    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/me/', current_user, name='current_user'),

    # Issues API
    path('api/', include('issues.urls')),
    path('api/users/technicians/', technicians_list),

]
