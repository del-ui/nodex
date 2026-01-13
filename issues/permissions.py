from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsReporter(BasePermission):
    """Allow Reporter to create issues"""
    def has_permission(self, request, view):
        # Reporter can POST (create) and GET their own issues
        if request.user.is_authenticated:
            if request.method == "POST":
                return request.user.role == "REPORTER"
            if request.method in SAFE_METHODS:
                return True  # GET allowed for all authenticated
        return False

class IsAdminOrReadOnly(BasePermission):
    """Admin can do anything, others read-only"""
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.role == "ADMIN":
                return True
            # Others can GET only
            if request.method in SAFE_METHODS:
                return True
        return False

class IsTechnicianOrReadOnly(BasePermission):
    """Technician can PATCH/PUT to resolve assigned issues"""
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.role == "TECHNICIAN":
                # Allow PATCH/PUT only
                if request.method in ["PATCH", "PUT"]:
                    return True
            if request.method in SAFE_METHODS:
                return True
        return False
