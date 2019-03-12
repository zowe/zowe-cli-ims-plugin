#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

program_name=$1
bmptype=$2
dopt=$3
fp=$4
route=$5
schdtype=$6
transtat=$7

zowe ims set program "$1" --bmptype $2 --dopt $3 --fp $4 --rte $5 --schdtype $6 --transtat $7
