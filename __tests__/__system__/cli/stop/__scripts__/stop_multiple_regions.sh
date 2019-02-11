#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

regNum=$1
regNum2=$2

zowe ims stop region --region-ids $1 $2
