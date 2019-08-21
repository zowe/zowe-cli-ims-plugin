# IBM® IMS™ Plug-in for Zowe CLI

[![codecov](https://codecov.io/gh/zowe/zowe-cli-ims-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/zowe/zowe-cli-ims-plugin)

The IBM IMS Plug-in for Zowe CLI lets you extend Zowe CLI to interact with IMS resources (programs and transactions). You can use the plug-in to create new IMS applications or update existing IMS applications. For more information about IMS, see [IBM Information Management System (IMS)](https://www.ibm.com/it-infrastructure/z/ims).

## Understanding how the plug-in works

As an application developer or DevOps administrator, you can use IBM IMS Plug-in for Zowe CLI to perform the following tasks:

-   Refresh IMS transactions, programs, and dependent IMS regions.
-   Deploy application code into IMS production or test systems.
-   Write scripts to automate IMS actions that you traditionally perform using ISPF editors, TSO, and SPOC.

## Prerequisites

Before you install the plug-in, meet the following prerequisites:
-   Install Zowe CLI on your computer.

    **Note:** For more information, see [Installing Zowe CLI](https://zowe.github.io/docs-site/latest/user-guide/cli-installcli.html).

-   Ensure that [IBM® IMS™ v14.1.0](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_14.1.0/com.ibm.ims14.doc/ims_product_landing_v14.html) or later is installed and running in your mainframe environment.

-   Configure [IBM® IMS™ Connect](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_13.1.0/com.ibm.ims13.doc.ccg/ims_ct_intro.htm). IMS Connect is required so that IBM IMS Command Services can function. 

-   Configure [IBM® IMS™ Operations APIs](https://github.com/zowe/ims-operations-api). The APIs enable communication between the CLI and the IMS instance.

## Installing the plug-in

Use one of the following methods to install the plug-in:

-   Install the plug-in from an online registry or a local package.

    Use the online registry/local package method when you simply want to install the plug-in to Zowe CLI and start using it.

    For more information, see [Installing plug-ins](https://zowe.org/docs-site/latest/user-guide/cli-installplugins.html) on the [Zowe Docs](https://zowe.org/docs-site/latest/) website.

-   Build the plug-in from source and install it into your Zowe CLI implementation.

    Use the build from source method when you want to install the plug-in to Zowe CLI using the most current binaries and modify the behavior of the plug-in. For example, you want to create a new command and use the plug-in with the command that you created.

    For more information, see [Building the plug-in from source](#building-the-plug-in-from-source).

## Building the plug-in from source

**Follow these steps:**
1.  The first time that you clone the IBM IMS Plug-in for Zowe CLI from the GitHub repository, issue the following command against the local directory:

    ```
    npm install
    ```
    The command installs the required IBM IMS Plug-in for Zowe CLI dependencies and several development tools. When necessary, you can run the task at any time to update the tools.

2.  To build your code changes, issue the following command:

    ```
    npm run build
    ```

    The first time you build your code changes, you will be prompted for the location of the Imperative CLI Framework package, which is located in the `node_modules/@zowe` folder in the directory where Zowe CLI was installed.

    **Note:** When you update `package.json` to include new dependencies, or when you pull changes that affect `package.json`, issue the `npm update` command to download the dependencies.

3.  Issue one of the following commands to install the plug-in:

    ```
    zowe plugins install <local path your cloned repo>
    ```

    Or:

    ```
    zowe plugins install .
    ```

**Tip:** After the installation process completes, it validates that the plug-in was installed correct and the names of its commands, options, and arguments do not conflict with that of the other plug-ins that you installed into your Zowe CLi implimentation.

When the validation process is successful, the following message displays:

```
Validation results for plugin 'ims':
Successfully validated.
```

When an unsuccessful message displays, you can troubleshoot the installation by addressing the issues that the message describes. You can also review the information that is contained in the log file that is located in the directory where you installed Zowe CLI.

## Create a user profile

You can create an `ims` user profile to avoid typing your connection details on every command. An `ims` profile contains the host, port, username, and password for the IMS region or plex of your choice. You can create multiple profiles and switch between them as needed.

**Follow these steps:**
1.  Create an `ims` profile: 
    ```
    zowe profiles create ims-profile <profileName> --host <hostname> --port <portnumber> --ims-connect-host <hostname> --ims-connect-port <portnumber> --user <username> --password <password>
    ```

    The result of the command displays as a success or failure message. You can use your profile when you issue commands in the ims command group.

**Tip:** For more information about the syntax, actions, and options, for a profiles create command, open Zowe CLI and issue the following command:

```
zowe profiles create ims-profile -h
```

## Running tests

You can perform the following types of tests on the IBM IMS plug-in:

-   Unit
-   Integration
-   System

**Note:** For detailed information about conventions and best practices for running tests against Zowe CLI plug-ins, see
[Zowe CLI Plug-in Testing Guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/PluginTESTINGGuidelines.md).

Before running the system and integration tests, ensure that the requires IBM IMS applications are installed and configured as required. For more information, see [Prerequisites](#prerequisites).

Copy the file named `.../__tests__/__resources__/properties/example_properties.yaml` and create a file named `.../__tests__/__resources__/properties/custom_properties.yaml`. Customize the file named `custom_properties.yaml` as required for your environment.

**Note:** Information about how to customize the `custom_properties.yaml` file is provided in the yaml file itself.

Issue the following commands to run the tests:

1.  `npm run test:unit`
2.  `npm run test:integration`
3.  `npm run test:system`

Any failures potentially indicate an issue with the set-up of the Rest API or configuration parameters that were passed in the `custom_properties.yaml` file.

## Uninstall the Plug-in

**Follow these steps:**

1.  To uninstall the plug-in from a base application, issue the following command:
    ```
    zowe plugins uninstall @zowe/ims-for-zowe-cli
    ```
After the uninstallation process completes successfully, the product no longer contains the plug-in. 

## Tutorials

To learn about how to work with the sample plug-in, build new commands, or build a new plug-in for Zowe CLI, see [Developing for Zowe CLI](https://zowe.org/docs-site/latest/extend/extend-cli/cli-devTutorials.html).

## Imperative CLI Framework documentation

[Imperative CLI Framework](https://github.com/zowe/imperative/wiki) documentation is a key source of information to learn about the features of Imperative CLI Framework (the code framework that you use to build plug-ins for Zowe CLI). Refer to the documentation as you develop your plug-in.

## Contributing to the plug-in

For information about contributing to the plug-in, see the Zowe CLI [Contribution Guidelines](CONTRIBUTING.md).

The guidelines contain critical information about working with the code. This includes information about, running, writing, maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates properly with Zowe CLI.