from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'is_staff')


class TimelineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Timeline
        fields = ('id', 'user', 'colour_one', 'colour_two', 'colour_three', 'label_one', 'label_two', 'label_three')


class TimelineItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = TimelineItem
        fields = ('id', 'timeline', 'type', 'description', 'start', 'end')