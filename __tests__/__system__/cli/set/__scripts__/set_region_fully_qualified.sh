#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

program_name=$1
bmptype=$2
dopt=$3
fp=$4
route=$5
schdtype=$6
transtat=$7
HOST=$8
PORT=$9
USER=$10
PASSWORD=$11
ims_connect_host=$12
ims_connect_port=$13
plex=$14

zowe ims set program "$1" --bmptype $2 --dopt $3 --fp $4 --rte $5 --schdtype $6 --transtat $7 --host $8 --port $9 --user ${10} --password ${11} --ims-connect-host ${12} --ims-connect-port ${13} --plex ${14}
