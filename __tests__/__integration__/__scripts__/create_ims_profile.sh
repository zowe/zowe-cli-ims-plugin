#!/usr/bin/env bash
set -e

zowe profiles create ims testProfile --host "myhost" --port 443 --user fakeuser --password fakepass --ich "otherhost" --icp 445 --plex "plex1"