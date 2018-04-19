import { merge } from "lodash";

export const mergeProps = (stateProps, dispatchProps, ownProps) => merge(stateProps, dispatchProps, ownProps);
