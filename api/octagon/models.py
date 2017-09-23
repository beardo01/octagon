from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Run when user object is created
@receiver(post_save, sender=User)
def create_or_update_member(sender, instance, created, **kwargs):
    if created:
        Timeline.objects.create(user=instance)


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


class Event(models.Model):
    # Relationships
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)

    # Details
    type = models.PositiveSmallIntegerField(null=False, blank=False)
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=50)
    start = models.DateTimeField()
    end = models.DateTimeField()
    repeat_start = models.DateTimeField(null=True, default=None)
    repeat_end = models.DateTimeField(null=True, default=None)
    repeat_frequency = models.PositiveSmallIntegerField(default=0)


class EventRepeat(models.Model):
    # Relationships
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    # Details
    start = models.DateTimeField()
    end = models.DateTimeField()