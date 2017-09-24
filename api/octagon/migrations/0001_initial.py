# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-24 03:31
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField()),
                ('description', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=50)),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('repeat_start', models.DateTimeField(default=None, null=True)),
                ('repeat_end', models.DateTimeField(default=None, null=True)),
                ('repeat_frequency', models.PositiveSmallIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='EventRepeat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='octagon.Event')),
            ],
        ),
        migrations.CreateModel(
            name='Timeline',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('colour_one', models.CharField(default='red', max_length=10)),
                ('colour_two', models.CharField(default='green', max_length=10)),
                ('colour_three', models.CharField(default='blue', max_length=10)),
                ('label_one', models.CharField(default='Meeting', max_length=15)),
                ('label_two', models.CharField(default='Assignment', max_length=15)),
                ('label_three', models.CharField(default='Event', max_length=15)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='timeline',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='octagon.Timeline'),
        ),
    ]
