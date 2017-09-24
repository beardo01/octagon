from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class TimelineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Timeline
        fields = ('id', 'user', 'colour_one', 'colour_two', 'colour_three', 'label_one', 'label_two', 'label_three')
        read_only_fields = ('id',)


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'timeline', 'start', 'end', 'type', 'description', 'location', 'repeat_start', 'repeat_end',
                  'repeat_frequency')
        read_only_fields = ('id', 'timeline')


class EventRepeatSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventRepeat
        fields = ('id', 'event', 'start', 'end')
        read_only_fields = ('id',)