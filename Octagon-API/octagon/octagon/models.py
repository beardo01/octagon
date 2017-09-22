from django.db import models
from django.utils import timezone
from decimal import Decimal
from datetime import timedelta
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    client_key = models.CharField(max_length=255)
    timeline = models.ForeignKey('Timeline')
    #timeline_item

    def __str__(self):
        return self.user.username

    @receiver(post_save, sender=User)
    def create_or_update_member(sender, instance, created, **kwargs):
        if created:
            Member.objects.create(user=instance)

class Timeline(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    colour_one = models.CharField(max_length=255)
    colour_two = models.CharField(max_length=255)
    colour_three = models.CharField(max_length=255)
    label_one = models.CharField(max_length=255)
    label_two = models.CharField(max_length=255)
    label_three = models.CharField(max_length=255)


class TimelineItem(models.Model):
    type = models.IntegerField(null=False, blank=False)
    description = models.CharField(max_length=255)
    start = models.DateTimeField(null=False, blank=False)
    end = models.DateTimeField(null=False, blank=False)
