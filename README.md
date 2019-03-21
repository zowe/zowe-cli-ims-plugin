# Zowe CLI Plug-in for IBM® Information Management System (IMS)™
The Zowe CLI Plug-in for IBM® Information Management System (IMS)™ lets you extend Zowe CLI to interact with IMS resources (programs and transactions). You can use the plug-in to create new IMS applications or update existing IMS applications. For more information about IMS, see [IBM Information Management System (IMS)](https://www.ibm.com/it-infrastructure/z/ims).

As an application developer or DevOps administrator, you can use Zowe CLI Plug-in for IBM IMS to perform the following tasks:

- Refresh IMS transactions, programs, and dependent IMS regions.
- Deploy application code into IMS production or test systems.
- Write scripts to automate IMS actions that you traditionally perform using ISPF editors, TSO, and SPOC. 

## Contribution Guidelines

For Zowe CLI development guidelines and IMS plug-in specific development information, see [the Contribution Guidelines](CONTRIBUTING.md).

**Tip:** Follow the [tutorials on the documentation site](https://zowe.github.io/docs-site/latest/extend/extend-cli/cli-devTutorials.html) to start developing your first plug-in! 

## Prerequisites
Before you install the plug-in, meet the following prerequisites:
* Install Zowe CLI on your PC.

    **Note:** For more information, see [Installing Zowe CLI](https://zowe.github.io/docs-site/latest/user-guide/cli-installcli.html).

* Ensure that [IBM® IMS™ v14.1.0](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_14.1.0/com.ibm.ims14.doc/ims_product_landing_v14.html) or later is installed and running in your mainframe environment.

* Configure [IBM® IMS™ Connect](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_13.1.0/com.ibm.ims13.doc.ccg/ims_ct_intro.htm). IMS Connect is required so that IBM IMS Command Services can function. 

* Configure IBM® IMS™ Command Services. IMS Command Services are APIs that enable communication between the CLI and the IMS instance. 

## Build the Plug-in from Source
**Follow these steps:**
1. The first time that you clone the Zowe CLI plug-in for IMS from the GitHub repository, issue the following command against the local directory:

    ```
    npm install
    ```
    The command installs the required Zowe CLI Plug-in for IMS dependencies and several development tools. When necessary, you can run the task at any time to update the tools.

2. To build your code changes, issue the following command:

    ```
    npm run build
    ```

    The first time you build your code changes, you will be prompted for the location of the Imperative CLI Framework package, which is located in the `node_modules/@zowe` folder in the directory where Zowe CLI was installed.

    **Note:** When you update `package.json` to include new dependencies, or when you pull changes that affect `package.json`, issue the `npm update` command to download the dependencies.

## Install the Zowe CLI Plug-in for IMS

**Follow these steps:**

1.  [Meet the prerequisites](#prerequisites).

2.  Install the plug-in:
    ```
    zowe plugins install @zowe/ims@latest
    ``` 
    
    **Note**: The `latest` npm tag installs a version of the product that is intended for public consumption. You can use different npm      tags to install other versions of the product. For example, you can install with the `@beta` tag to try new features that have not      been fully validated. For more information about tag usage, see [NPM Tag Names](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md#npm-tag-names).
    
3.  (Optional) Verify the installation:
    ```
    zowe plugins validate @zowe/ims
    ```
    When you install the plug-in successfully, the following message displays:
    ```
    Validation results for plugin 'ims':
    Successfully validated.
    ``` 
    **Tip:** When an unsuccessful message displays, you can troubleshoot the installation by addressing the issues that the message describes. You can also review the information that is contained in the log file that is located in the directory where you installed Zowe CLI.  

4.  [Create a user profile](#create-a-user-profile).

## Create a User Profile
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

## Run Tests

For information about running automated, unit, and system and integration tests using the plug-in, see [Zowe CLI Plug-in Testing Guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/PluginTESTINGGuidelines.md).

## Uninstall the Plug-in

**Follow these steps:**
1.  To uninstall the plug-in from a base application, issue the following command:
    ```
    zowe plugins uninstall @zowe/ims
    ```
After the uninstallation process completes successfully, the product no longer contains the plug-in. 
