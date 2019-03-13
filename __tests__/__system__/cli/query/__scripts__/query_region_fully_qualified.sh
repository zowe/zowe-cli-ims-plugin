#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

DC=$1
REGION=$2
ROUTE=$3
HOST=$4
PORT=$5
USER=$6
PASSWORD=$7
ims_connect_host=$8
ims_connect_port=$9
plex=$20

zowe ims query region --dc $1 --region $2 --route $3 --host $4 --port $5 --user $6 --password $7 --ims-connect-host $8 --ims-connect-port $9 --plex ${10}
