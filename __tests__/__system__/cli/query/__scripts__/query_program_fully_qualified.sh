#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code

program_name=$1
attributes=$2
status=$3
route=$4
HOST=$5
PORT=$6
USER=$7
PASSWORD=$8
ich=$9
icp=$10
plex=$11

zowe ims query program $1 --route $4 --host $5 --port $6 --user $7 --password $8 --ich $9 --ims-connect-port ${10} --plex ${11}
