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


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TimelineViewSet(viewsets.ModelViewSet):
    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer


class TimelineItemViewSet(viewsets.ModelViewSet):
    queryset = TimelineItem.objects.all()
    serializer_class = TimelineItemSerializer

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
