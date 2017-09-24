from django.conf.urls import url, include
from .views import *
from rest_framework.routers import DefaultRouter
# from rest_framework.authtoken import views
from .views import *

# Create a router and register our ViewSets
router = DefaultRouter()


router.register(r'users', UserViewSet, 'user-detail')
router.register(r'timeline', TimelineViewSet, 'timeline-detail')
router.register(r'event', EventViewSet, 'event-detail')
router.register(r'eventrepeat', EventRepeatViewSet, 'eventrepeat-detail')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', obtain_auth_token),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
