from .models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TimelineViewSet(viewsets.ModelViewSet):
    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

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


