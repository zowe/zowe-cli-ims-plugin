#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

program_name=$1
attributes=$2
route=$3
HOST=$4
PORT=$5
USER=$6
PASSWORD=$7
ich=$8
icp=$9
plex=$10

zowe ims query program $1 --route $3 --host $4 --port $5 --user $6 --password $7 --ich $8 --ims-connect-port $9 --plex ${10}
