from datetime import timedelta

from django.utils import timezone
from rest_framework import parsers, renderers
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import list_route, detail_route
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
import pendulum

from .permissions import *
from .serializers import *


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        else:
            return User.objects.filter(id=self.request.user.id)


class TimelineViewSet(viewsets.ModelViewSet):
    serializer_class = TimelineSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        """
        The queryset should be items the user owns
        """
        return Timeline.objects.filter(user=self.request.user)


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Event.objects.filter(timeline=Timeline.objects.get(user=self.request.user))

    def perform_create(self, serializer):

        # Check that the serializer is valid
        if serializer.is_valid():
            # Ensure that the user is creating the event for their timeline
            serializer.validated_data['timeline'] = Timeline.objects.get(id=self.request.auth.user.id)

        event = serializer.save()

        # Generate repeats
        self.generate_repeats(event)

    def perform_update(self, serializer):
        # Check that the serializer is valid
        if serializer.is_valid():
            # Ensure that the user is creating the event for their timeline
            serializer.validated_data['timeline'] = Timeline.objects.get(id=self.request.auth.user.id)

        event = serializer.save()

        # Delete old repeats
        EventRepeat.objects.filter(event=event).delete()

        # Generate repeats
        self.generate_repeats(event)

    def perform_destroy(self, instance):
        # Delete repeated events
        EventRepeat.objects.filter(event=instance).delete()

        # Delete event
        instance.delete()

    def generate_repeats(self, event):
        # Check to see if the event repeats
        repeat_frequency = event.repeat_frequency
        if repeat_frequency is not None and repeat_frequency != 0:

            # Get event information
            start_date = event.repeat_start
            end_date = event.repeat_end

            # Get repeat frequency
            if repeat_frequency == 1:
                freq = 1
            elif repeat_frequency == 2:
                freq = 7
            elif repeat_frequency == 3:
                freq = 30

            diff = (end_date - start_date).days
            repeats = diff / freq

            for repeat in range(int(repeats) + 1):
                if start_date + timedelta(days=freq * repeat) == event.start:
                    pass
                else:
                    EventRepeat.objects.create(event=event, start=start_date + timedelta(freq * repeat),
                                               end=end_date + timedelta(freq * repeat))

    @list_route(methods=['get'])
    def list_events(self, request, **kwargs):
        event_list = []
        day_counter = 0
        while day_counter < 10:
            day = []

            tz = pendulum.timezone(Timeline.objects.get(user=self.request.user).timezone)
            # start_day = tz.convert((timezone.now() + timedelta(days=day_counter)))
            now = tz.convert(timezone.now())
            start_day = (now - timedelta(hours=now.hour, minutes=now.minute, seconds=now.second,
                                                    microseconds=now.microsecond)) + timedelta(days=day_counter)

            days_events = Event.objects.filter(timeline=Timeline.objects.get(user=self.request.user),
                                               start__day=start_day.day)
            days_repeat_events = EventRepeat.objects.filter(event__in=Event.objects.filter(user=self.request.user),
                                                            start__day=start_day.day)
            days_events.order_by('start')

            count = 0
            if days_events.count() == 0 and days_repeat_events == 0:
                event_list.append("No items today")
            else:
                for event in days_events:
                    json = {}
                    json.update({'type': event.type})
                    json.update({'start': event.start.timestamp()})
                    json.update({'end': event.end.timestamp()})
                    json.update({'description': event.description})
                    json.update({'location': event.location})
                    json.update({'id': event.id})

                    json.update({'repeat_frequency': event.repeat_frequency})

                    if event.repeat_frequency > 0:
                        json.update({'repeat_start': event.repeat_start.timestamp()})
                        json.update({'repeat_end': event.repeat_end.timestamp()})
                    else:

                        json.update({'repeat_start': event.repeat_start})
                        json.update({'repeat_end': event.repeat_end})

                    day.append(json)
                    count += 1
                for repeat_event in days_repeat_events:
                    repeat = {}
                    repeat.update({'type': repeat_event.event.type})
                    repeat.update({'start': repeat_event.start.timestamp()})
                    repeat.update({'end': repeat_event.end.timestamp()})
                    repeat.update({'description': repeat_event.event.description})
                    repeat.update({'location': repeat_event.event.location})
                    repeat.update({'id': repeat_event.event.id})

                    repeat.update({'repeat_frequency': repeat_event.event.repeat_frequency})

                    if repeat_event.event.repeat_frequency > 0:
                        repeat.update({'repeat_start': repeat_event.event.repeat_start.timestamp()})
                        repeat.update({'repeat_end': repeat_event.event.repeat_end.timestamp()})
                    else:
                        repeat.update({'repeat_start': repeat_event.event.repeat_start})
                        repeat.update({'repeat_end': repeat_event.event.repeat_end})

                    day.append(repeat)
                    count += 1

                event_list.append(day)

            day_counter += 1

        return Response({
            'success': True,
            'detail': event_list
        })

    @detail_route(methods=['get'])
    def get_event(self, request, **kwargs):

        try:
            event = Event.objects.get(id=kwargs['pk'])

            json = {}
            json.update({'type': event.type})
            json.update({'start': event.start.timestamp()})
            json.update({'end': event.end.timestamp()})
            json.update({'description': event.description})
            json.update({'location': event.location})
            json.update({'id': event.id})

            json.update({'repeat_frequency': event.repeat_frequency})

            if event.repeat_frequency > 0:
                json.update({'repeat_start': event.repeat_start.timestamp()})
                json.update({'repeat_end': event.repeat_end.timestamp()})
            else:

                json.update({'repeat_start': event.repeat_start})
                json.update({'repeat_end': event.repeat_end})

            return Response({
                'success': True,
                'detail': json
            })
        except Event.DoesNotExist:

            return Response({
                'success': False,
                'detail': "Event does not exist."
            })


class EventRepeatViewSet(viewsets.ModelViewSet):
    serializer_class = EventRepeatSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return EventRepeat.objects.filter(event__in=Event.objects.filter(
            timeline=Timeline.objects.get(user=self.request.user)).values('id'))


class ObtainAuthToken(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # Update the user timezone
        timeline = Timeline.objects.get(user=user)
        timeline.timezone = serializer.initial_data['timezone']
        timeline.save()

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'success': True,
            'data': {
                'user_id': user.id,
                'client_key': token.key,
                'colours': {
                    'colour_one': Timeline.objects.get(user=user).colour_one,
                    'colour_two': Timeline.objects.get(user=user).colour_two,
                    'colour_three': Timeline.objects.get(user=user).colour_three
                },
                'labels': {
                    'label_one': Timeline.objects.get(user=user).label_one,
                    'label_two': Timeline.objects.get(user=user).label_two,
                    'label_three': Timeline.objects.get(user=user).label_three
                }
            }
        })

obtain_auth_token = ObtainAuthToken.as_view()

        # return Response({
#     'success': True,
#     'data': {
#         'client_key': token.key,
#         'colours': {
#             'colour_one': Timeline.objects.get(user=user).colour_one,
#             'colour_two': Timeline.objects.get(user=user).colour_two,
#             'colour_three': Timeline.objects.get(user=user).colour_three
#         },
#         'labels': {
#             'label_one': Timeline.objects.get(user=user).label_one,
#             'label_two': Timeline.objects.get(user=user).label_two,
#             'label_three': Timeline.objects.get(user=user).label_three
#         }
#     }
# })