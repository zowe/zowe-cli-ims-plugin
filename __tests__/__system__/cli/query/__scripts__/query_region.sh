#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

DC=$1
REGION=$2
ROUTE=$3

zowe ims query region --dc $1 --region $2 --route $3
