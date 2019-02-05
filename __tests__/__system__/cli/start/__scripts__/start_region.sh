#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

member_name=$1

zowe ims start region "$member_name"
