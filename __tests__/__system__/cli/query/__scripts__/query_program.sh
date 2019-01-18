#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

program_name=$1
attribute=$2

zowe ims query program $1 --attributes $2
