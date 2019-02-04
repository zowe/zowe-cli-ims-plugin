#!/bin/bash
set -e

echo "===============IMS QUERY TRANSACTION HELP==============="

zowe ims query transaction --help
if [ $? -gt 0 ]
then
    exit $?
fi