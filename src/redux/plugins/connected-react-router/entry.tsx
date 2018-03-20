import * as React from "react";
import { all } from "redux-saga/effects";
import { connectRouter, routerMiddleware, ConnectedRouter } from "connected-react-router";
import history from "../../history";
export const moduleName = "connected-react-router";

const reduxModule: IReduxModule = {
    moduleName,
    reducerEnhancers: [connectRouter(history)],
    middlewares: [routerMiddleware(history)],
};

export default reduxModule;
