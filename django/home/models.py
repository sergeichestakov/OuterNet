# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Articles(models.Model):
    id = models.AutoField(primary_key=True)
    filename = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    last_updated = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    pub_date = models.DateTimeField('date published')
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

class Meta:
    db_table = "articles"
