from django.conf.urls import url, include
from django.contrib import admin
from .views import *
from rest_framework.routers import DefaultRouter

# Create a router and register our ViewSets
router = DefaultRouter()
router.register(r'users', UserViewSet, 'user-detail')
router.register(r'timeline', TimelineViewSet, 'timeline-detail')
router.register(r'timelineitem', TimelineItemViewSet, 'timelineitem-detail')

urlpatterns = [
    url(r'^', include(router.urls)),
]
