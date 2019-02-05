#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

member_name=$1
HOST=$2
PORT=$3
USER=$4
PASSWORD=$5
ims_connect_host=$6
ims_connect_port=$7
plex=$8

zowe ims query program $1 --host $2 --port $3 --user $4 --password $5 --ims-connect-host $6 --ims-connect-port $7 --plex $8
