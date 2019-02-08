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

// ******* ATTENTION:  PLEASE KEEP IN ALPHABETICAL ORDER
// TODO - needs updated for IMS
export default {
    // CREATE: {
    //     SUMMARY: "Create new IMS resources",
    //     DESCRIPTION: "Define new resources (for example, programs) in IMS.",
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
        DESCRIPTION: "Query application programs or transactions across an IMSplex." +
            "The query returns information about application programs and transactions (for example, class, status, queue count, and more). " +
            "This command submits a 'QUERY PGM' or 'QUERY TRAN' IMS command and returns the output.", 
        RESOURCES: {
            PROGRAM: {
                DESCRIPTION: "Query an IMS application program.",
                POSITIONALS: {
                    NAMES: "Specifies the names of the programs to query.",
                },
                OPTIONS: {
                    ATTRIBUTES: "Specifies the application program output fields to return.",
                    STATUS: "Selects programs for display that possess at least one of the specified program statuses.",
                    ROUTE: "Specifies the routes to return."
                },
                MESSAGES: {
                    SUCCESS: "The information for '%s' was retrieved successfully."
                },
                EXAMPLES: {
                    EX1: "Query information for an application program named PGM123",
                    EX2: "Query information for application programs named ABC and XYZ",
                    EX3: "Query information for application programs starting with PROG using the wild card character '*'",
                }
            },
            TRANSACTION: {
                DESCRIPTION: "Query an IMS transaction.",
                POSITIONALS: {
                    NAMES: "Specifies the name of transaction(s) to query. You can use an * character as a wildcard to select multiple transactions.",
                },
                OPTIONS: {
                    ATTRIBUTES: "Specifies the transaction output fields to return.",
                    STATUS: "Selects transactions that possess at least one of the specified transaction statuses.",
                    ROUTE: "Specifies the routes to return.",
                    CLASS: "Selects transactions by the classes you specify.",
                    QCNTCOMP: "The compare operator used to select transactions based on queue count. Valid values: LT, LE, GT, GE, EQ or NE.",
                    QCNTVAL: "The numeric value used with 'queue_count_operator' to select transactions based on queue count.",
                    CONV: "Selects transactions by the conversational attributes you specify.",
                    FP: "Selects transactions by the Fast Path options you specify.",
                    REMOTE: "Selects transactions by the remote option you specify.",
                    RESP: "Selects transactions by the response mode option you specify.",
                },
                MESSAGES: {
                    SUCCESS: "The information for '%s' was retrieved successfully."
                },
                EXAMPLES: {
                    EX1: "Query transaction information for transaction named TRN12",
                    EX2: "Query transaction information for transactions named TRAN1 and TRAN2",
                    EX3: "Query transaction information for transactions starting with TRAN using the wild card character '*'",
                }
            }
        }
    },
    START: {
        SUMMARY: "Start resources in IMS",
        DESCRIPTION: "Starts a region, application program, or transaction and makes IMS resources available for reference and use. " +
            "This command submits a '/START REGION', 'UPDATE PGM' or 'UPDATE TRAN' IMS command and returns the output.",
        RESOURCES: {
            PROGRAM: {
                DESCRIPTION: "Start an IMS application program.",
                POSITIONALS: {
                    NAMES: "The names of the application programs to start. The maximum length of a program name is eight characters.",
                },
                OPTIONS: {
                    ATTRIBUTES: "The attributes that are to be started",
                    ROUTE: "The region(s) to route the command",
                },
                MESSAGES: {
                    SUCCESS: "The application program(s) '%s' were started successfully."
                },
                EXAMPLES: {
                    EX1: "Start an application program named PGM123"
                }
            },
            TRANSACTION: {
                DESCRIPTION: "Start an IMS transaction.",
                POSITIONALS: {
                    NAMES: "The names of the transactions to start. The maximum length of a transaction name is eight characters.",
                },
                OPTIONS: {
                    ATTRIBUTES: "The attributes that are to be started",
                    ROUTE: "The region(s) to route the command",
                },
                MESSAGES: {
                    SUCCESS: "The transaction(s) '%s' were started successfully."
                },
                EXAMPLES: {
                    EX1: "Start a transaction named TRN1",
                }
            },
            REGION: {
                DESCRIPTION: "Start an IMS region.", 
                POSITIONALS: {
                    MEMBERNAME: "The name of the member that contains JCL for the region to start. " +
                        " The maximum length of the member name is eight characters. " +
                        " If no member name is specified, the default " +
                        "member name is used\n",
                },
                OPTIONS: {
                    LOCAL: "If you specify the --local option, IMS overrides the symbolic IMSID parameter " +
                        "in the JCL of the default or specified member. --local is the default if you specify " +
                        "the --job-name option.",
                    JOBNAME: "Use this option to override the job name on the JOB statement of the " +
                        "default or specified JCL member for a dependent region."
                },
                MESSAGES: {
                    SUCCESS: "The region specified in member '%s' was started successfully."
                },
                EXAMPLES: {
                    EX1: "Start a region stored in a member named MEM1",
                }
            }
        }
    },
    STOP: {
        SUMMARY: "Stop resources in IMS",
        DESCRIPTION: "Stops a running region, application program or transaction. " +
            "This command submits a '/STOP REGION', 'UPDATE PGM' or 'UPDATE TRAN' IMS command and returns the output.\",",
        RESOURCES: {
            PROGRAM: {
                DESCRIPTION: "Stop an IMS application program.",
                POSITIONALS: {
                    NAMES: "The names of the programs to stop. The maximum length of a program name is eight characters.",
                },
                OPTIONS: {
                    ATTRIBUTES: "The attributes that are to be stopped",
                    ROUTE: "The region(s) to route the command",
                },
                MESSAGES: {
                    SUCCESS: "The application program(s) '%s' were stopped successfully."
                },
                EXAMPLES: {
                    EX1: "Stop an application program named PGM123"
                }
            },
            TRANSACTION: {
                DESCRIPTION: "Stop an IMS transaction.",
                POSITIONALS: {
                    NAMES: "The names of the transactions to stop. The maximum length of a transaction name is eight characters.",
                },
                OPTIONS: {
                    ATTRIBUTES: "The attributes that are to be stopped",
                    ROUTE: "The region(s) to route the command",
                },
                MESSAGES: {
                    SUCCESS: "The transaction(s) '%s' were stopped successfully."
                },
                EXAMPLES: {
                    EX1: "Stop a transaction named TRN1"
                }
            },
            REGION: {
                DESCRIPTION: "Stop an IMS region.",
                POSITIONALS: {},
                OPTIONS: {
                    JOBNAME: "The name of the job for the IMS region you want to stop. You must specify either this option or --region-ids.",
                    REGIONIDS: "Region identifier numbers for the regions you want to stop. You must specify either this option " +
                        "or --job-name.",
                    ABDUMP: "Specify this option to cause abnormal termination (ABEND) of an application program. " +
                        "If the transaction indicated by this argument is currently running in the specified region," +
                        " an error message is received at the master terminal, indicating an application " +
                        "program ABEND. The region will remain active, but the transaction will be " +
                        "stopped. The command is ignored if the transaction is not currently scheduled " +
                        "in the region.",
                    TRANSACTION: "Specify a transaction in wait-for-input mode to stop its message processing within the specified region.",
                    CANCEL: "Use this option if the region cannot be stopped with a stop region --abdump" +
                        " command. To use this option, you must have already submitted a stop region command using the --abdump option."
                },
                MESSAGES: {
                    SUCCESS: "The region(s) identified by '%s' stopped successfully."
                },
                EXAMPLES: {
                    EX1: "Stop a region with job name JOBNM1"
                }
            }
        }
    }
};
