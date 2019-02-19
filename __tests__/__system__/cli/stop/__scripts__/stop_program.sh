#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

program_name=$1

zowe ims stop program "$1"
