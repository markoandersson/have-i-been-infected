#!/bin/sh

aws s3 rm s3://haveibeeninfected --recursive
aws s3 cp ./dist s3://haveibeeninfected --recursive