#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

transaction_name=$1
attributes=$2
HOST=$3
PORT=$4
USER=$5
PASSWORD=$6
ims_connect_host=$7
ims_connect_port=$8
plex=$9

zowe ims query transaction $1 --attributes $2 --host $3 --port $4 --user $5 --password $6 --ims-connect-host $7 --ims-connect-port $8 --plex $9
