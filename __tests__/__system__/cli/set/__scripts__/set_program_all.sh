#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

program_name=$1
bmptype=$2
dopt=$3
fp=$4
gpsb=$5
lang=$6
lock=$7
resident=$8
route=$9
schdtype=$10
transtat=$11

zowe ims set program "$1" --bmptype $2 --dopt $3 --fp $4 --gpsb $5 --lang $6 --lock $7 --r $8 --rte $9 --schdtype ${10} --transtat ${11}
