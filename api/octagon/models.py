from django.db import models
from django.utils import timezone
from decimal import Decimal
from datetime import timedelta
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Run when user object is created
@receiver(post_save, sender=User)
def create_or_update_member(sender, instance, created, **kwargs):
    if created:
        Member.objects.create(user=instance)
        Timeline.objects.create(user=instance)


class Member(models.Model):
    # Relationships
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Details
    client_key = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username


class Timeline(models.Model):
    # Relationships
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Details
    colour_one = models.CharField(max_length=10, default="red")
    colour_two = models.CharField(max_length=10, default="green")
    colour_three = models.CharField(max_length=10, default="blue")
    label_one = models.CharField(max_length=15, default="Meeting")
    label_two = models.CharField(max_length=15, default="Assignment")
    label_three = models.CharField(max_length=15, default="Event")


class TimelineItem(models.Model):
    # Relationships
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)

    # Details
    type = models.PositiveSmallIntegerField(null=False, blank=False)
    description = models.CharField(max_length=255)
    start = models.DateTimeField(null=False, blank=False)
    end = models.DateTimeField(null=False, blank=False)
    location = models.CharField(max_length=255)