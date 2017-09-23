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


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        """
        The queryset should be items the user owns
        """
        event = Event.objects.get(user=self.request.user)

        return Event.objects.filter(timeline=event)
    #
    # def create_item_list(self, items):
    #     all_items = []
    #     for item in items:
    #         json = {}
    #         json.update({'id': item.id})
    #         json.update({'type': item.type})
    #         json.update({'start': item.start})
    #         json.update({'end': item.end})
    #         json.update({'description': item.description})
    #         json.update({'location': item.location})
    #         all_items.append(json)
    #     return all_items
    #
    # @list_route(methods=['get'], url_name='get_week')
    # def get_week(self, request):
    #     """
    #     Return 2 weeks of items to the user to fill up their local database with.
    #     """
    #     tl = Timeline.objects.get(user=request.user)
    #     current_date = datetime.now(timezone.utc)
    #
    #     items = TimelineItem.objects.filter(timeline=tl, start__gte=current_date,
    #                                        start__lte=current_date+timedelta(days=14))
    #
    #     future_items = self.create_item_list(items)
    #
    #     return Response({
    #         'status': 'success',
    #         'detail': future_items
    #     })

    def perform_create(self, serializer):

        # Check that the serializer is valid
        if serializer.is_valid():
            serialized_event = serializer.validated_data

            # Check to see if the event repeats
            repeat_frequency = serialized_event.get('repeat_frequency')
            if repeat_frequency is not None and repeat_frequency != 0:

                # Get event information
                start_date = serialized_event.get('repeat_start')
                end_date = serialized_event.get('repeat_end')


        serializer.save()



    # def perform_update(self, serializer):
    #     event = self.get_object()
    #
    #     # Check that the serializer is valid
    #     if serializer.is_valid():
    #
    #         # Check to see if the event repeats
    #         if event.repeat_frequency != 0:
    #
    #             # Get all items linked to the event
    #             linked_items = EventRepeat.objects.filter(event=event)
    #
    #             # Update the entire queryset
    #             for item in linked_items:
    #                 item.type = serializer.validated_data['type']
    #                 item.description = serializer.validated_data['description']
    #                 item.location = serializer.validated_data['location']
    #
    #         else:
    #             EventRepeat.objects.get(id=1)


class EventRepeatViewSet(viewsets.ModelViewSet):
    queryset = EventRepeat.objects.all()
    serializer_class = EventRepeatSerializer

