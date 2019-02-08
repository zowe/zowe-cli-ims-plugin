#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

transaction_name=$1

zowe ims stop transaction "$1"
