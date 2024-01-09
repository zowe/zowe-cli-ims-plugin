#!/usr/bin/env bash
set -e
# should fail with conflicting option message
zowe ims stop region --job-name HELLO --region-ids THIS SHOULD CONFLICT
