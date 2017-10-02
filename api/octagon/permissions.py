from rest_framework import permissions
from rest_framework.compat import is_authenticated


class IsOwner(permissions.BasePermission):
    """
    Check if the owner of the request is the owner of the object
    """
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        elif view.action in ['list', 'retrieve', 'destroy']:
            return True
        elif view.action in ['list_events', 'get_event']:
            return True
        elif not request.data.get('user') and not request.data.get('user_id'):
            return False
        elif view.action in ['create', 'update', 'partial_update'] and request.data.get('user') == request.user.id or \
                        request.data.get('user_id') == request.user.id:
            return True
        # White list that object level permissions should take care of.
        else:
            return False

    def has_object_permission(self, request, view, obj):
        """
        Check if the request.user has permission to access the object.
        """
        # if request.method in permissions.SAFE_METHODS:
        return obj.user == request.user

        # return False