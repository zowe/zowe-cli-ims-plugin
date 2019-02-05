#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

regNum=$1
jobName=$2

zowe ims stop region --region-ids $1 --job-name $2
