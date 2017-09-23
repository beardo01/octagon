from rest_framework.permissions import IsAuthenticated

from .models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from datetime import datetime, timezone
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets, status
from django.shortcuts import render
from rest_framework import permissions
from .permissions import *


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        """
        Not really sure if I want there here, just doing it because i did the others.

        Maybe need to add 'timelineitem-list' in the urls.py
        """
        user = self.request.user
        return User.objects.filter(username=user)


class TimelineViewSet(viewsets.ModelViewSet):
    serializer_class = TimelineSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        """
        The queryset should be items the user owns
        """
        return Timeline.objects.filter(user=self.request.user)


class TimelineItemViewSet(viewsets.ModelViewSet):
    serializer_class = TimelineItemSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    def get_queryset(self):
        """
        The queryset should be items the user owns
        """
        tl = Timeline.objects.get(user=self.request.user)

        return TimelineItem.objects.filter(timeline=tl)

    def create_item_list(self, items):
        all_items = []
        for item in items:
            json = {}
            json.update({'id': item.id})
            json.update({'type': item.type})
            json.update({'start': item.start})
            json.update({'end': item.end})
            json.update({'description': item.description})
            json.update({'location': item.location})
            all_items.append(json)
        return all_items

    @list_route(methods=['get'], url_name='get_week')
    def get_week(self, request):
        """
        Return 2 weeks of items to the user to fill up their local database with.
        """
        tl = Timeline.objects.get(user=request.user)
        current_date = datetime.now(timezone.utc)

        items = TimelineItem.objects.filter(timeline=tl, start__gte=current_date,
                                           start__lte=current_date+timedelta(days=14))

        future_items = self.create_item_list(items)

        return Response({
            'status': 'success',
            'detail': future_items
        })
