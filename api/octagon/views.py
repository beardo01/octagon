from .models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework import viewsets

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TimelineViewSet(viewsets.ModelViewSet):
    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer


class TimelineItemViewSet(viewsets.ModelViewSet):
    queryset = TimelineItem.objects.all()
    serializer_class = TimelineItemSerializer