from django.conf.urls import url, include
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

# Create a router and register our ViewSets
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'timeline', TimelineViewSet)
router.register(r'event', EventViewSet)
router.register(r'eventrepeat', EventRepeatViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', views.obtain_auth_token),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
