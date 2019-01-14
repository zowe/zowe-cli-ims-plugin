/**
 * Interface representing parameters for the startRegion API
 */
export interface IStartRegionParms {

    /**
     * The name of the member containing JCL for the region to start.
     * The maximum length of the member name is eight characters.
     * If no member name is specified, the default
     * member name is used
     */
    memberName?: string;

    /**
     * If you specify the --local option, IMS overrides the symbolic IMSID parameter
     * in the JCL of the default or specified member. --local is the default if you specify
     * the --job-name option.
     */
    local?: boolean;

    /**
     * Use this option to override the job name on the JOB statement of the
     * default or specified JCL member for a dependent region
     */
    jobName?: string;
}
