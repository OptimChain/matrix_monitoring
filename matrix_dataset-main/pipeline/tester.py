from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import csv
import json
from django.views.decorators.csrf import csrf_exempt
import boto3
import pandas as pd
import sys

access_key  = '[redacted]'
secret_key = '[redacted]'
bucket_name = "[redacted]"
object_name = "[redacted]"


session = boto3.Session(aws_access_key_id=access_key, aws_secret_access_key=secret_key)

def list():
    bucketnames = []
    s3 = session.resource('s3')
    for bucket in s3.buckets.all():
        bucketnames.append(bucket.name)


def get_filenames(bucket):
    session = boto3.Session(aws_access_key_id=access_key, aws_secret_access_key=secret_key)
    s3 = session.resource('s3')
    my_bucket = s3.Bucket(bucket)
    file_lists = []
    for my_bucket_object in my_bucket.objects.all():
        file_lists.append(my_bucket_object.key)
    return JsonResponse(file_lists, safe=False)

get_filenames(bucket_name)
