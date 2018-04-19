import { createReducer } from "redux-create-reducer";
import actions from "./actions";
import { ITask } from "./interfaces";
import { IAction } from "../../../utils/interfaces";
import { get } from "lodash";
import { composeReducers } from "../../../utils/composeReducers";

export interface ITodoListState {
    items?: ITask[];
    item?: ITask;
    status?: {
        list?: string,
        show?: string,
        save?: string,
        update?: string,
        remove?: string,
    };
    selected?: number[];
    dialog?: {
        visible?: boolean;
        id?: number;
    };
}

const initialState = {};

const statusReducer = (type: string, status: string) => (state: ITodoListState, action: IAction): ITodoListState => ({
    ...state,
    status: {
        ...get(state, "status", {}),
        [type]: status,
    },
});

export default createReducer(initialState, {

    // LIST
    [actions.types.LIST.REQUEST]: statusReducer("list", "request"),
    [actions.types.LIST.SUCCESS]: composeReducers(
        statusReducer("list", "success"),
        (state: ITodoListState, action: IAction): ITodoListState => {
            return {
                ...state,
                items: get(action, "payload.items", []),
            };
        },
    ),
    [actions.types.LIST.FAILURE]: statusReducer("list", "failure"),

    // SHOW
    [actions.types.SHOW.REQUEST]: statusReducer("show", "request"),
    [actions.types.SHOW.SUCCESS]: composeReducers(
        statusReducer("show", "success"),
        (state: ITodoListState, action: IAction): ITodoListState => {
            return {
                ...state,
                item: get(action, "payload.item", []),
            };
        },
    ),
    [actions.types.SHOW.FAILURE]: statusReducer("show", "failure"),

    // SAVE
    [actions.types.SAVE.REQUEST]: statusReducer("save", "request"),
    [actions.types.SAVE.SUCCESS]: composeReducers(
        statusReducer("save", "success"),
        (state: ITodoListState, action: IAction): ITodoListState => {
            return {
                ...state,
                items: [
                    get(action, "payload.item", {}),
                    ...get(state, "items", []),
                ],
            };
        },
    ),
    [actions.types.SAVE.FAILURE]: statusReducer("save", "failure"),

    // UPDATE
    [actions.types.UPDATE.REQUEST]: statusReducer("update", "request"),
    [actions.types.UPDATE.SUCCESS]: composeReducers(
        statusReducer("update", "success"),
        (state: ITodoListState, action: IAction): ITodoListState => {

            const stateItems = get(state, "items", []) as ITask[];
            const actionItems = get(action, "payload.items", []) as ITask[];
            const actionItem = get(action, "payload.item", {}) as ITask;

            if (actionItems.length > 0) { // Multiple Item
                return {
                    ...state,
                    items: stateItems.map((item: ITask) => actionItems.filter((x) => x.id === item.id)[0] || item),
                };
            } else { // Single Item
                return {
                    ...state,
                    items: stateItems.map((item: ITask) => (actionItem && item.id === actionItem.id) ? actionItem : item),
                };
            }
        },
    ),
    [actions.types.UPDATE.FAILURE]: statusReducer("update", "failure"),

    // REMOVE
    [actions.types.REMOVE.REQUEST]: statusReducer("remove", "request"),
    [actions.types.REMOVE.SUCCESS]: composeReducers(
        statusReducer("remove", "success"),
        (state: ITodoListState, action: IAction): ITodoListState => {

            const stateItems = get(state, "items", []) as ITask[];
            const actionIndices = (get(action, "payload.items", []) as ITask[]).map((x) => x.id);
            const actionIndex = get(action, "payload.item.id");

            if (actionIndices.length > 0) { // Multiple Item
                return {
                    ...state,
                    items: stateItems.filter((item: ITask) => actionIndices.indexOf(item.id) === -1),
                };
            } else { // Single Item
                return {
                    ...state,
                    items: stateItems.filter((item: ITask) => item.id !== actionIndex),
                };
            }
        },
    ),
    [actions.types.REMOVE.FAILURE]: statusReducer("remove", "failure"),

    // TICK
    [actions.types.TICK]: (state: ITodoListState, action: IAction): ITodoListState => {
        const selected: number[] = get(state, "selected", []);
        return {
            ...state,
            selected: (selected.indexOf(get(action, "payload.id")) === -1 ?
                [...selected, get(action, "payload.id")]
                : selected.filter((x) => x !== get(action, "payload.id"))).sort((a, b) => a - b),
        };
    },

    // setDialogVisible
    [actions.types.SET_DIALOG_VISIBLE]: (state: ITodoListState, action: IAction): ITodoListState => {
        return {
            ...state,
            dialog: {
                visible: get(action, "payload.visible", false),
                id: get(action, "payload.id"),
            },
        };
    },

    // clear selection
    [actions.types.CLEAR_SELECTION]: (state: ITodoListState, action: IAction): ITodoListState => {
        return {
            ...state,
            selected: [],
        };
    },
});
