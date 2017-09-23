from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from datetime import timedelta
from rest_framework.authtoken.models import Token
from rest_framework import parsers, renderers
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

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
            serialized_event = serializer.validated_data

            # Ensure that the user is creating the event for their timeline
            serializer.validated_data['timeline'] = Timeline.objects.get(id=self.request.auth.user.id)

        event = serializer.save()

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

            for repeat in range(int(repeats)):
                EventRepeat.objects.create(event=event, start=start_date + timedelta(freq * repeat),
                                           end=end_date + timedelta(freq * repeat))


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