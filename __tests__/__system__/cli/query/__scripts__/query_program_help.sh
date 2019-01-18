#!/bin/bash
set -e

echo "===============IMS QUERY PROGRAM HELP==============="

zowe ims query program --help
if [ $? -gt 0 ]
then
    exit $?
fi