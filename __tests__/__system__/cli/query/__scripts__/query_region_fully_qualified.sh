#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

HOST=$1
PORT=$2
USER=$3
PASSWORD=$4
ims_connect_host=$5
ims_connect_port=$6
plex=$7

zowe ims query region --host $1 --port $2 --user $3 --password $4 --ims-connect-host $5 --ims-connect-port $6 --plex $7
