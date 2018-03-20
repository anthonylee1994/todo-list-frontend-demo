import { applyMiddleware, createStore } from "redux";
import { enhancer, initialState, reducer, middlewares, onStoreCreate, importModules, reducerEnhancers } from "./import";

export function configureStore() {
    const store = createStore(reducerEnhancers ? reducerEnhancers(reducer) : reducer, initialState, enhancer(applyMiddleware(...middlewares)));
    onStoreCreate && onStoreCreate.forEach((o) => {
        typeof o === "function" && o(importModules);
    });
    return store;
}

export default configureStore();
