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
export default {
    QUERY: {
        SUMMARY: "Query resources from IMS",
        DESCRIPTION: "Query application programs, regions or transactions across an IMSplex." +
            "The query returns information about application programs, regions and transactions. " +
            "This command submits a 'QUERY PGM', 'DIS ACT' or 'QUERY TRAN' IMS command and returns the output.",
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
                    EX4: "Query information for all application programs (default is all)",
                    EX5: "Query information for all application programs specifying optional parameters",
                    EX6: "Query information for all application programs specifying optional connection parameters",
                }
            },
            REGION: {
                DESCRIPTION: "Query an IMS region.",
                POSITIONALS: {
                },
                OPTIONS: {
                    DC: "TODO - what is a DC.",
                    REGION: "TODO - what is REGION.",
                    ROUTE: "Specifies the routes to return."
                },
                MESSAGES: {
                    SUCCESS: "The information for '%s' was retrieved successfully."
                },
                EXAMPLES: {
                    EX1: "Query information for regions on route IMS1",
                    EX2: "Query information for regions on routes IMS1 and IMS2",
                    EX3: "Query DC and region information for regions on routes IMS1 and IMS2",
                    EX4: "Query information for regions specifying optional connection parameters",
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
                    EX4: "Query transaction information for all transactions(default is all)",
                    EX5: "Query transaction information for all transactions specifying optional parameters",
                    EX6: "Query transaction information for all transactions specifying optional connection parameters",
                }
            }
        }
    },
    SET: {
        SUMMARY: "Update resources in IMS",
        DESCRIPTION: "Updates an application program or transaction and makes IMS resources available for reference and use. " +
            "This command submits a 'UPDATE PGM' or 'UPDATE TRAN' IMS command and returns the output.",
        RESOURCES: {
            PROGRAM: {
                DESCRIPTION: "Update an IMS application program.",
                POSITIONALS: {
                    NAMES: "The names of the application programs to update. The maximum length of a program name is eight characters.",
                },
                OPTIONS: {
                    BMPTYPE: "TODO (N or Y)",
                    DOPT: "TODO Specifies the dynamic option (N or Y)",
                    FP: "TODO Specifies the dynamic option (E or N)",
                    GPSB: "TODO Specifies the dynamic option (N or Y)",
                    LANG: "Specifies the language (ASSEM, COBOL, JAVA, PASCAL, PLI)",
                    LOCK: "Specifies the dynamic option (ON or OFF)",
                    OPTION: "Specifies the dynamic option (ALLRSP)",
                    RESIDENT: "Specifies the dynamic option (N or Y)",
                    ROUTE: "The region(s) to route the command to",
                    SCHDTYPE: "Specifies the dynamic option (PARALLEL or SERIAL)",
                    TRANSTAT: "Specifies the dynamic option (N or Y)",
                },
                MESSAGES: {
                    SUCCESS: "The application program(s) '%s' were updated successfully."
                },
                EXAMPLES: {
                    EX1: "Start an application program named PGM123",
                    EX2: "Start all application programs beginning with ACC*",
                    EX3: "Start an application program named PGM234 and start tracing",
                    EX4: "Start an application program named PGM890 routing to control regions IMS1 and IMS2",
                    EX5: "Start an application programs named XYZ1 specifying optional connection parameters"
                }
            },
            TRANSACTION: {
                DESCRIPTION: "Update an IMS transaction.",
                POSITIONALS: {
                    NAMES: "The names of the transactions to update. The maximum length of a transaction name is eight characters.",
                },
                OPTIONS: {
                    AOCMD: "TODO (N, CMD, TRAN, Y)",
                    CLASS: "TODO Array of integer",
                    CMTMODE: "(SNGL, MULT)",
                    CONV: "(N or Y)",
                    CPRI: "TODO integer",
                    DCLWA: "(N or Y)",
                    DIRROUTE: "(N or Y)",
                    EDITRTN: "TODO STRING",
                    EDITUC: "TODO (N or Y)",
                    EMHBSZ: "TODO integer",
                    EXPRTIME: "TODO integer",
                    FP: "(E, N, P)",
                    INQ: "(N or Y)",
                    LCT: "Integer",
                    LPRI: "integer",
                    LOCK: "(ON or OFF)",
                    MAXRGN: "integer",
                    MSGTYPE: "TODO (MULTSEG or SNGLSEG)",
                    MSNAME: "TODO string",
                    NPRI: "TODO integer",
                    OPTION: "(ALLRSP)",
                    PARLIM: "TODO integer",
                    PGM: "TODO string",
                    PLCT: "TODO integer",
                    PLCTTIME: "TODO integer",
                    RECOVER: "TODO (N or Y)",
                    REMOTE: "TODO (N or Y)",
                    RESP: "TODO (N or Y)",
                    ROUTE: "The region(s) to route the command to",
                    SCOPE: "TODO (ALL or ACTIVE)",
                    SEGNO: "TODO integer",
                    SEGSZ: "TODO integer",
                    SERIAL: "TODO (N or Y)",
                    SETCLASS: "TODO integer",
                    SIDL: "TODO integer",
                    SIDR: "TODO integer",
                    SPASZ: "TODO integer",
                    SPATRUNC: "TODO (S or R)",
                    TRANSTAT: "TODO (N or Y)",
                    WFI: "TODO (N or Y)",
                },
                MESSAGES: {
                    SUCCESS: "The transaction(s) '%s' were updated successfully."
                },
                EXAMPLES: {
                    EX1: "Start a transaction named TRN1",
                    EX2: "Start all transactions beginning with TRN*",
                    EX3: "Start a transaction named TRN2 and start tracing",
                    EX4: "Start a transaction named TRN3 routing to control regions IMS1 and IMS2",
                    EX5: "Start a transaction named TRN4 specifying optional connection parameters"
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
                    ROUTE: "The region(s) to route the command to",
                },
                MESSAGES: {
                    SUCCESS: "The application program(s) '%s' were started successfully."
                },
                EXAMPLES: {
                    EX1: "Start an application program named PGM123",
                    EX2: "Start all application programs beginning with ACC*",
                    EX3: "Start an application program named PGM234 and start tracing",
                    EX4: "Start an application program named PGM890 routing to control regions IMS1 and IMS2",
                    EX5: "Start an application programs named XYZ1 specifying optional connection parameters"
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
                        "default or specified JCL member for a dependent region.",
                    ROUTE: "The region(s) to route the command to",
                },
                MESSAGES: {
                    SUCCESS: "The region specified in member '%s' was started successfully."
                },
                EXAMPLES: {
                    EX1: "Start a region stored in a member named MEM1",
                    EX2: "Start a region stored in a member named MEM2 specifying the region to route the command",
                    EX3: "Start a region stored in a member named MEM3 and override the job name",
                    EX4: "Start a region stored in a member named MEM4 routing to control regions IMS1 and IMS2",
                    EX5: "Start a region stored in a member named MEM5 specifying optional connection parameters"
                }
            },
            TRANSACTION: {
                DESCRIPTION: "Start an IMS transaction.",
                POSITIONALS: {
                    NAMES: "The names of the transactions to start. The maximum length of a transaction name is eight characters.",
                },
                OPTIONS: {
                    ATTRIBUTES: "The attributes that are to be started",
                    ROUTE: "The region(s) to route the command to",
                },
                MESSAGES: {
                    SUCCESS: "The transaction(s) '%s' were started successfully."
                },
                EXAMPLES: {
                    EX1: "Start a transaction named TRN1",
                    EX2: "Start all transactions beginning with TRN*",
                    EX3: "Start a transaction named TRN2 and start tracing",
                    EX4: "Start a transaction named TRN3 routing to control regions IMS1 and IMS2",
                    EX5: "Start a transaction named TRN4 specifying optional connection parameters"
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
                    EX1: "Stop an application program named PGM123",
                    EX2: "Stop all application programs beginning with ACC*",
                    EX3: "Stop tracing an application program named PGM234",
                    EX4: "Stop an application program named PGM890 routing to control regions IMS1 and IMS2",
                    EX5: "Stop an application programs named XYZ1 specifying optional connection parameters"
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
                        " command. To use this option, you must have already submitted a stop region command using the --abdump option.",
                    ROUTE: "The region(s) to route the command to",
                },
                MESSAGES: {
                    SUCCESS: "The region(s) identified by '%s' stopped successfully."
                },
                EXAMPLES: {
                    EX1: "Stop a region with job name JOBNM1",
                    EX2: "Stop multiple regions with region identifiers",
                    EX3: "Stop a region with region identifier and cause the abnormal termination (ABEND) of the application program",
                    EX4: "Stop a region with region identifier and specify 'cancel' because the 'abdump' option failed to stop the region",
                    EX5: "Stop a region with job name JOBNM4 specifying optional connection parameters"
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
                    EX1: "Stop a transaction named TRN1",
                    EX2: "Stop all transactions beginning with TRN*",
                    EX3: "Stop tracing a transaction named TRN2",
                    EX4: "Stop a transaction named TRN3 routing to control regions IMS1 and IMS2",
                    EX5: "Stop a transaction named TRN4 specifying optional connection parameters"
                }
            }
        }
    }
};
