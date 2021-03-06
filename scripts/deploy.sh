#!/bin/bash

node_modules/.bin/cfn-lambda zip --output deploy/archive.zip

echo "Deploy $TRAVIS_TAG version to S3"
aws s3 cp deploy/archive.zip s3://chatanoo-deployment.eu-west-1/aws-cloudformation-route53-hostedzone-details/$TRAVIS_TAG.zip

echo "Upload latest"
aws s3api put-object \
  --bucket chatanoo-deployment.eu-west-1 \
  --key aws-cloudformation-route53-hostedzone-details/latest.zip \
  --website-redirect-location /chatanoo-deployment.eu-west-1/aws-cloudformation-route53-hostedzone-details/$TRAVIS_TAG.zip
