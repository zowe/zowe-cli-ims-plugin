/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

// ******* ATTENTION:  LEASE KEEP IN ALPHABETICAL ORDER
// TODO - needs updated for IMS
export default {
    // CREATE: {
    //     SUMMARY: "Create new resources to IMS",
    //     DESCRIPTION: "Define new resources (for example, programs) to IMS.",
    //     RESOURCES: {
    //         PROGRAM: {
    //             DESCRIPTION: "Create a new program to IMS.",
    //             POSITIONALS: {
    //                 PROGRAMNAME: "The name of the new program to create.
    //             },
    //             OPTIONS: {
    //                 REGIONNAME: "The IMS region name to which to define the new program",
    //                 IMSPLEX: "The name of the IMSPlex to which to define the new program"
    //             },
    //             MESSAGES: {
    //                 SUCCESS: "The program '%s' was defined successfully."
    //             },
    //             EXAMPLES: {
    //                 EX1: "Create a program named PGM123 to the region name MYREGION in the CSD group MYGRP"
    //             }
    //         },
    //         TRANSACTION: {
    //             DESCRIPTION: "Define a new transaction to IMS.",
    //             POSITIONALS: {
    //                 TRANSACTIONNAME: "The name of the new transaction to define. The maximum length of the transaction name is four characters.",
    //                 PROGRAMNAME: "The name of the program that the transaction uses. The maximum length of the program name is eight characters.",
    //                 CSDGROUP: "The IMS system definition (CSD) Group for the new transaction that you want to define." +
    //                     " The maximum length of the group name is eight characters."
    //             },
    //             OPTIONS: {
    //                 REGIONNAME: "The IMS region name to which to define the new transaction",
    //                 IMSPLEX: "The name of the IMSPlex to which to define the new transaction"
    //             },
    //             MESSAGES: {
    //                 SUCCESS: "The transaction '%s' was defined successfully."
    //             },
    //             EXAMPLES: {
    //                 EX1: "Define a transaction named TRN1 for the program named PGM123 to the region named MYREGION " +
    //                     "in the CSD group MYGRP"
    //             }
    //         }
    //     }
    // },
    QUERY: {
        SUMMARY: "Query resources from IMS",
        DESCRIPTION: "Query application programs or transactions across the IMSplex. " +
            "It displays information about application programs and transactions (for example, class, status, queue count, and others). " +
            "This command submits a 'QUERY PGM' or 'QUERY TRAN' IMS command and returns the output.",
        RESOURCES: {
            PROGRAM: {
                DESCRIPTION: "Command to specify the application program(s) to be queried.",
                POSITIONALS: {
                    NAME: "The names of the programs to query.",
                },
                OPTIONS: {
                    SHOW: "Specifies the application program output fields to be returned."
                },
                MESSAGES: {
                    SUCCESS: "The information for '%s' were retrieved successfully."
                },
                EXAMPLES: {
                    EX1: "Query information for application program named PGM123",
                    EX2: "Query information for application programs named ABC and XYZ",
                    EX3: "Query information for application programs starting with PROG using the wild card character '*'",
                }
            },
            TRANSACTION: {
                DESCRIPTION: "Command to specify the transaction(s) to be queried.",
                POSITIONALS: {
                    NAME: "The name of the transaction(*) to query.",
                },
                OPTIONS: {
                    SHOW: "Specifies the transaction output fields to be returned."
                },
                MESSAGES: {
                    SUCCESS: "The information for '%s' were retrieved successfully."
                },
                EXAMPLES: {
                    EX1: "Query transaction information for transaction TRN12",
                    EX2: "Query transaction information for transactions named TRAN1 and TRAN2",
                    EX3: "Query transaction information for transactions starting with TRAN using the wild card character '*'",
                }
            }
        }
    },
    START: {
        SUMMARY: "Start resources in IMS",
        DESCRIPTION: "Starts a region, application program, or transaction and makes IMS resources available for reference and use. " +
        "This command submits a '/START REGION', '/START PGM' or '/START TRAN' IMS command and returns the output.",
        RESOURCES: {
            PROGRAM: {
                DESCRIPTION: "Command to specify the application program to be started.",
                POSITIONALS: {
                    NAME: "The name of the application program to start. The maximum length of the program name is eight characters.",
                },
                // OPTIONS: {
                //     REGIONNAME: "The IMS region name to which to install the program",
                //     IMSPLEX: "The name of the IMSPlex to which to install the program"
                // },
                MESSAGES: {
                    SUCCESS: "The application program named '%s' was started successfully."
                },
                EXAMPLES: {
                    EX1: "Start an application program named PGM123"
                }
            },
            TRANSACTION: {
                DESCRIPTION: "Command to specify the transaction that is to be started.",
                POSITIONALS: {
                    NAME: "The name of the transaction to start. The maximum length of the transaction name is eight characters.",
                },
                // OPTIONS: {
                //     REGIONNAME: "The IMS region name to which to install the transaction",
                //     IMSPLEX: "The name of the IMSPlex to which to install the transaction"
                // },
                MESSAGES: {
                    SUCCESS: "The transaction '%s' was started successfully."
                },
                EXAMPLES: {
                    EX1: "Start a transaction named TRN1",
                }
            },
            REGION: {
                DESCRIPTION: "Command to specify the region that is to be started.",
                POSITIONALS: {
                    NAME: "The name of the region to start. The maximum length of the region name is eight characters.",
                },
                // OPTIONS: {
                //     REGIONNAME: "The IMS region name to which to install the transaction",
                //     IMSPLEX: "The name of the IMSPlex to which to install the transaction"
                // },
                MESSAGES: {
                    SUCCESS: "The region '%s' was started successfully."
                },
                EXAMPLES: {
                    EX1: "Start a region named REGION",
                }
            }
        }
    },
    STOP: {
        SUMMARY: "Stop resources in IMS",
        DESCRIPTION: "Stops a running region, application program or transaction. " +
        "This command submits a '/STOP REGION', '/STOP PGM' or '/STOP TRAN' IMS command and returns the output.\",",
        RESOURCES: {
            PROGRAM: {
                DESCRIPTION: "Command to specify the application program to be stopped.",
                POSITIONALS: {
                    NAME: "The name of the program to stop. The maximum length of the program name is eight characters.",
                },
                // OPTIONS: {
                //     REGIONNAME: "The IMS region name from which to delete the program",
                //     IMSPLEX: "The name of the IMSPlex from which to delete the program"
                // },
                MESSAGES: {
                    SUCCESS: "The application program '%s' was stopped successfully."
                },
                EXAMPLES: {
                    EX1: "Stop an application program named PGM123"
                }
            },
            TRANSACTION: {
                DESCRIPTION: "Command to specify the transaction that is to be stopped.",
                POSITIONALS: {
                    NAME: "The name of the transaction to stop. The maximum length of the transaction name is eight characters.",
                },
                // OPTIONS: {
                //     REGIONNAME: "The IMS region name from which to delete the transaction",
                //     IMSPLEX: "The name of the IMSPlex from which to delete the transaction"
                // },
                MESSAGES: {
                    SUCCESS: "The transaction '%s' was stopped successfully."
                },
                EXAMPLES: {
                    EX1: "Stop a transaction named TRN1"
                }
            },
            REGION: {
                DESCRIPTION: "Command to specify the IMS region to be stopped.",
                POSITIONALS: {
                    NAME: "The name of the region (job) to stop. The maximum length of the transaction name is four characters.",
                },
                // OPTIONS: {
                //     REGIONNAME: "The IMS region name from which to delete the transaction",
                //     IMSPLEX: "The name of the IMSPlex from which to delete the transaction"
                // },
                MESSAGES: {
                    SUCCESS: "The region '%s' was stopped successfully."
                },
                EXAMPLES: {
                    EX1: "Stop a region named REGION1"

                }
            }
        }
    }
};
