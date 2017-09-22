from django.conf.urls import url, include
from django.contrib import admin
from .views import *
from rest_framework.routers import DefaultRouter

# Create a router and register our ViewSets
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'timeline', TimelineViewSet)
router.register(r'timelineitem', TimelineItemViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
