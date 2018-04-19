import { moduleName } from "./constants";
import { createAction } from "redux-actions";
import { ITask } from "./interfaces";
import { IAction } from "../../../utils/interfaces";

const types = {
    LIST: {
        REQUEST: `@@${moduleName}/LIST_REQUEST`,
        SUCCESS: `@@${moduleName}/LIST_SUCCESS`,
        FAILURE: `@@${moduleName}/LIST_FAILURE`,
    },
    SHOW: {
        REQUEST: `@@${moduleName}/SHOW_REQUEST`,
        SUCCESS: `@@${moduleName}/SHOW_SUCCESS`,
        FAILURE: `@@${moduleName}/SHOW_FAILURE`,
    },
    SAVE: {
        REQUEST: `@@${moduleName}/SAVE_REQUEST`,
        SUCCESS: `@@${moduleName}/SAVE_SUCCESS`,
        FAILURE: `@@${moduleName}/SAVE_FAILURE`,
    },
    UPDATE: {
        REQUEST: `@@${moduleName}/UPDATE_REQUEST`,
        SUCCESS: `@@${moduleName}/UPDATE_SUCCESS`,
        FAILURE: `@@${moduleName}/UPDATE_FAILURE`,
    },
    REMOVE: {
        REQUEST: `@@${moduleName}/REMOVE_REQUEST`,
        SUCCESS: `@@${moduleName}/REMOVE_SUCCESS`,
        FAILURE: `@@${moduleName}/REMOVE_FAILURE`,
    },
    TICK: `@@${moduleName}/TICK`,
    CLEAR_SELECTION: `@@${moduleName}/CLEAR_SELECTION`,
    SET_DIALOG_VISIBLE: `@@${moduleName}/SET_DIALOG_VISIBLE`,
};

const creators = {
    list: {
        request: createAction(types.LIST.REQUEST, () => ({})),
        success: createAction(types.LIST.SUCCESS, (items: ITask[]) => ({ items })),
        failure: createAction(types.LIST.FAILURE, (requestAction: IAction, response) => ({ requestAction, response })),
    },
    show: {
        request: createAction(types.SHOW.REQUEST, (id: number) => ({ id })),
        success: createAction(types.SHOW.SUCCESS, (item: ITask) => ({ item })),
        failure: createAction(types.SHOW.FAILURE, (requestAction: IAction, response) => ({ requestAction, response })),
    },
    save: {
        request: createAction(types.SAVE.REQUEST, (item: ITask) => ({ item })),
        success: createAction(types.SAVE.SUCCESS, (item: ITask) => ({ item })),
        failure: createAction(types.SAVE.FAILURE, (requestAction: IAction, response) => ({ requestAction, response })),
    },
    update: {
        request: createAction(types.UPDATE.REQUEST, (data: ITask | ITask[]) => ({
            [Array.isArray(data) ? "items" : "item"]: data,
        })),
        success: createAction(types.UPDATE.SUCCESS, (data: ITask | ITask[]) => ({
            [Array.isArray(data) ? "items" : "item"]: data,
        })),
        failure: createAction(types.UPDATE.FAILURE, (requestAction: IAction, response) => ({ requestAction, response })),
    },
    remove: {
        request: createAction(types.REMOVE.REQUEST, (data: ITask | ITask[]) => ({
            [Array.isArray(data) ? "items" : "item"]: data,
        })),
        success: createAction(types.REMOVE.SUCCESS, (data: ITask | ITask[]) => ({
            [Array.isArray(data) ? "items" : "item"]: data,
        })),
        failure: createAction(types.REMOVE.FAILURE, (requestAction: IAction, response) => ({ requestAction, response })),
    },
    tick: createAction(types.TICK, (id: number) => ({ id })),
    clearSelection: createAction(types.CLEAR_SELECTION, () => ({})),
    setDialogVisible: createAction(types.SET_DIALOG_VISIBLE, (visible: boolean, id?: number) => ({
        visible,
        id,
    })) as (visible: boolean, id?: number) => IAction,
};

export default { types, creators };
