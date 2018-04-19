import { moduleName } from "./constants";
import { ITodoListState } from "./reducer";
import { get } from "lodash";

const getRootState = (state) => get(state, moduleName, {}) as ITodoListState;

const list = (state) => getRootState(state).items || [];
const show = (state) => getRootState(state).item || null;
const status = (state) => getRootState(state).status || {};
const selected = (state) => getRootState(state).selected || [];
const dialog = (state) => getRootState(state).dialog || {};

export default {
    list,
    show,
    status,
    selected,
    dialog,
};
