from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import csv
import json
from django.views.decorators.csrf import csrf_exempt
import boto3
import pandas as pd
import sys
import logging

access_key  = "[redacted]"
secret_key = "[redacted]"
bucket_name = "[redacted]"
object_name = "[redacted]"


logger = logging.getLogger(__name__)

@csrf_exempt
def get_all_buckets(request):
    bucketnames = []
    session = boto3.Session(aws_access_key_id=access_key, aws_secret_access_key=secret_key)
    s3 = session.resource('s3')
    for bucket in s3.buckets.all():
        bucketnames.append(bucket.name)
    return JsonResponse(bucketnames, safe=False)


@csrf_exempt
def get_filenames(request):
    body_unicode = request.body.decode('utf-8')
    post_data = json.loads(body_unicode)
    session = boto3.Session(aws_access_key_id=access_key, aws_secret_access_key=secret_key)
    s3 = session.resource('s3')
    my_bucket = s3.Bucket(post_data['bucket_name'])
    file_lists = []
    for my_bucket_object in my_bucket.objects.all():
        file_lists.append(my_bucket_object.key)
    return JsonResponse(file_lists, safe=False)

    '''
     session = boto3.Session(aws_access_key_id=access_key, aws_secret_access_key=secret_key)
    s3 = session.resource('s3')
    my_bucket = s3.Bucket(post_data['bucket_name'])
    file_lists = []
    for my_bucket_object in my_bucket.objects.all():
        file_lists.append(my_bucket_object.key)
    '''



if sys.version_info[0] < 3: 
    from StringIO import StringIO # Python 2.x
else:
    from io import StringIO


def send_aws_request(bucket_name, object_name):
    s3_client = boto3.client("s3", aws_access_key_id=access_key, 
                             aws_secret_access_key=secret_key)

    
    logger.info("Response recieved: " + response)

    # Read an object from the bucket
    response = s3_client.get_object(Bucket= bucket_name, 
                                    Key=object_name)
    
   
    
    print(response)
    return response


@csrf_exempt
def home(request):

    logger = logging.getLogger(__name__)
    logger.info(f"Request received: {request.method} {request.path}")
    logger.info(f"Headers: {dict(request.headers)}")

    if request.body:
        body_unicode = request.body.decode('utf-8')
        post_data = json.loads(body_unicode)
        response = send_aws_request(bucket_name, post_data['object_name'])
        object_content = response["Body"].read().decode("utf-8")
        df = pd.read_csv(StringIO(object_content))
        new_df = df.to_json(orient='records', lines=True)
        return JsonResponse(new_df, safe=False)
    else:
        print(request)
    return HttpResponse('Home Page')


def convert_data_json(data):
    jsonArray = []
    
    for idx in range(len(data)):
        jsonArray.append({
            'date':data['date'][idx],
            'dataset':data['dataset'][idx],
            'metric':data['metric'][idx],
            'value':data['value'][idx]
        })
    return jsonArray


@csrf_exempt
def get_dataset_data(request):

    response = send_aws_request(bucket_name, object_name)
    object_content = response["Body"].read().decode("utf-8")
    df = pd.read_csv(StringIO(object_content))
    json_data = convert_data_json(df)

   # new_df = df.to_json(orient='records', lines=True)
    return JsonResponse(json_data, safe=False)

    # with open('media/_2023-11-15_.csv', mode ='r')as file:
    #     # reading the CSV file
    #     csvFile = csv.reader(file)
    #     jsonArray = convert_data_json(csvFile)
    # jsonString = json.dumps(jsonArray)
    # return JsonResponse(jsonArray[1:], safe=False)







