#!/bin/bash
set -e

echo "===============IMS QUERY REGION HELP==============="

zowe ims query region --help
if [ $? -gt 0 ]
then
    exit $?
fi