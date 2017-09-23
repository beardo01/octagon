# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from .serializers import *
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class PermissionsTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create(username='test', email='test@gmail.com')

        self.timeline = Timeline.objects.get(user=self.user)

        self.tl_item1 = TimelineItem.objects.create(timeline=self.timeline, type=1, description="Buying drugs from wandering sloth merchants.",
                                                    start="2017-09-26T21:09:00Z",end="2017-09-27T21:09:00Z", location="dirtroad")
        self.client.force_authenticate(user=self.user)

    def test_timelineitem_create(self):
        #self.user1 = User.objects.create(username='test1', email='test1@gmail.com')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('timelineitem-detail-get-week'))
        self.assertEquals(len(response.data['detail']), 1)

    def test_timelineitem_fail(self):
        data = {
            "timeline": 2,
            "user_url": "http://localhost:8000/users/1/",
            "folder": 1,
            "folder_url": "http://localhost:8000/folders/1/",
            "shared_with": [],
            "full_name": "File.ext",
            "name": "File",
            "extension": "ext",
            "uploaded_at": "2017-09-08T07:19:44.003714Z",
            "modified_at": "2017-09-08T07:19:44.003767Z",
            "size": "10.00",
            "type": "Misc",
            "image_width": None,
            "image_height": None,
            "fetch": "https://random.com/file",
            "deleted": False,
            "views": 0,
            "download_count": 0,
            "folder_deleted_from": None,
            "parent_share": []
        }