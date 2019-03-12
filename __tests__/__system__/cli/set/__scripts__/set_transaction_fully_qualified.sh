#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

transaction_name=$1
aocmd=$2
class=$3
fp=$4
route=$5
segno=$6
transtat=$7
HOST=$8
PORT=$9
USER=$10
PASSWORD=$11
ims_connect_host=$12
ims_connect_port=$13
plex=$14

zowe ims set transaction "$1" --aocmd $2 --class $3 --fp $4 --rte $5 --segno $6 --transtat $7 --host $8 --port $9 --user ${10} --password ${11} --ims-connect-host ${12} --ims-connect-port ${13} --plex ${14}
