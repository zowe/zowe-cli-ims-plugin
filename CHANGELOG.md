# Changelog

All notable changes to the IBM® IMS™ Plug-in for Zowe CLI will be documented in this file.

## Recent Changes

- Major: Updated for V2 compatibility. See the prerelease items below for more details.

## `3.0.0-next.202204142150`

- LTS Breaking: Updated the resource to use `api` instead of `apis`. [#23](https://github.com/zowe/zowe-cli-ims-plugin/issues/23)

## `3.0.0-next.202204141926`

- BugFix: Remove APIML Conn Lookup until the IMS definition for APIML is known.

## `3.0.0-next.202204132012`

- BugFix: Add missing `reject-unauthorized` flag.

## `3.0.0-next.202204081444`

- BugFix: Removed deprecated profiles API calls
- BugFix: Fixed prompting in daemon mode

## `3.0.0-next.202202071747`

- BugFix: Pruned dev dependencies from npm-shrinkwrap file.

## `3.0.0-next.202201261957`

- BugFix: Included an npm-shrinkwrap file to lock-down all transitive dependencies.

## `3.0.0-next.202107021833`

- Enhancement: Add apimlConnLookup properties to enable auto-config through APIML. A valid apiId must still be identified.

## `3.0.0-next.202106071926`

- **Breaking**: Removed the previously deprecated function ImsRestClient.performRest(). The function ImsRestClient.request() must now be used.

## `3.0.0-next.202104261402`

- Remove @zowe/cli peer dependency to better support NPM v7

## `2.0.4`

- BugFix: Updated `moment` dependency.

## `2.0.3`

- BugFix: Pruned dev dependencies from npm-shrinkwrap file.

## `2.0.2`

- BugFix: Included an npm-shrinkwrap file to lock-down all transitive dependencies.

## `2.0.1`

- Remove warnings at install time
- Update snapshots

## `2.0.0`

- Change name of plugin to be conformant