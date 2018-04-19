import { dummyTasks } from "../constants";
import actions from "../actions";

describe("Todo list actions", () => {
    // LIST
    it("list.request", () => {
        expect(actions.creators.list.request()).toEqual({
            type: actions.types.LIST.REQUEST,
            payload: {},
        });
    });
    it("list.success", () => {
        expect(actions.creators.list.success(dummyTasks)).toEqual({
            type: actions.types.LIST.SUCCESS,
            payload: {
                items: dummyTasks,
            },
        });
    });
    it("list.failure", () => {
        expect(actions.creators.list.failure(
            actions.creators.list.request(),
            null,
        )).toEqual({
            type: actions.types.LIST.FAILURE,
            payload: {
                requestAction: actions.creators.list.request(),
                response: null,
            },
        });
    });
    // SHOW
    it("show.request", () => {
        expect(actions.creators.show.request(1)).toEqual({
            type: actions.types.SHOW.REQUEST,
            payload: {
                id: 1,
            },
        });
    });
    it("show.success", () => {
        expect(actions.creators.show.success(dummyTasks[0])).toEqual({
            type: actions.types.SHOW.SUCCESS,
            payload: {
                item: dummyTasks[0],
            },
        });
    });
    it("show.failure", () => {
        expect(actions.creators.show.failure(
            actions.creators.show.request(1),
            null,
        )).toEqual({
            type: actions.types.SHOW.FAILURE,
            payload: {
                requestAction: actions.creators.show.request(1),
                response: null,
            },
        });
    });
    // SAVE
    it("save.request", () => {
        expect(actions.creators.save.request(dummyTasks[0])).toEqual({
            type: actions.types.SAVE.REQUEST,
            payload: {
                item: dummyTasks[0],
            },
        });
    });
    it("save.success", () => {
        expect(actions.creators.save.success(dummyTasks[0])).toEqual({
            type: actions.types.SAVE.SUCCESS,
            payload: {
                item: dummyTasks[0],
            },
        });
    });
    it("save.failure", () => {
        expect(actions.creators.save.failure(
            actions.creators.save.request(dummyTasks[0]),
            null,
        )).toEqual({
            type: actions.types.SAVE.FAILURE,
            payload: {
                requestAction: actions.creators.save.request(dummyTasks[0]),
                response: null,
            },
        });
    });
    // UPDATE
    it("update.request.single", () => {
        expect(actions.creators.update.request(dummyTasks[0])).toEqual({
            type: actions.types.UPDATE.REQUEST,
            payload: {
                item: dummyTasks[0],
            },
        });
    });
    it("update.success.single", () => {
        expect(actions.creators.update.success(dummyTasks[0])).toEqual({
            type: actions.types.UPDATE.SUCCESS,
            payload: {
                item: dummyTasks[0],
            },
        });
    });
    it("update.failure.single", () => {
        expect(actions.creators.update.failure(
            actions.creators.update.request(dummyTasks[0]),
            null,
        )).toEqual({
            type: actions.types.UPDATE.FAILURE,
            payload: {
                requestAction: actions.creators.update.request(dummyTasks[0]),
                response: null,
            },
        });
    });
    it("update.request.multiple", () => {
        expect(actions.creators.update.request(dummyTasks)).toEqual({
            type: actions.types.UPDATE.REQUEST,
            payload: {
                items: dummyTasks,
            },
        });
    });
    it("update.success.multiple", () => {
        expect(actions.creators.update.success(dummyTasks)).toEqual({
            type: actions.types.UPDATE.SUCCESS,
            payload: {
                items: dummyTasks,
            },
        });
    });
    it("update.failure.single", () => {
        expect(actions.creators.update.failure(
            actions.creators.update.request(dummyTasks),
            null,
        )).toEqual({
            type: actions.types.UPDATE.FAILURE,
            payload: {
                requestAction: actions.creators.update.request(dummyTasks),
                response: null,
            },
        });
    });
    // REMOVE
    it("remove.request.single", () => {
        expect(actions.creators.remove.request(dummyTasks[0])).toEqual({
            type: actions.types.REMOVE.REQUEST,
            payload: {
                item: dummyTasks[0],
            },
        });
    });
    it("remove.success.single", () => {
        expect(actions.creators.remove.success(dummyTasks[0])).toEqual({
            type: actions.types.REMOVE.SUCCESS,
            payload: {
                item: dummyTasks[0],
            },
        });
    });
    it("remove.failure.single", () => {
        expect(actions.creators.remove.failure(
            actions.creators.remove.request(dummyTasks[0]),
            null,
        )).toEqual({
            type: actions.types.REMOVE.FAILURE,
            payload: {
                requestAction: actions.creators.remove.request(dummyTasks[0]),
                response: null,
            },
        });
    });
    it("remove.request.multiple", () => {
        expect(actions.creators.remove.request(dummyTasks)).toEqual({
            type: actions.types.REMOVE.REQUEST,
            payload: {
                items: dummyTasks,
            },
        });
    });
    it("remove.success.multiple", () => {
        expect(actions.creators.remove.success(dummyTasks)).toEqual({
            type: actions.types.REMOVE.SUCCESS,
            payload: {
                items: dummyTasks,
            },
        });
    });
    it("remove.failure.single", () => {
        expect(actions.creators.remove.failure(
            actions.creators.remove.request(dummyTasks),
            null,
        )).toEqual({
            type: actions.types.REMOVE.FAILURE,
            payload: {
                requestAction: actions.creators.remove.request(dummyTasks),
                response: null,
            },
        });
    });
    // TICK
    it("tick", () => {
        expect(actions.creators.tick(1)).toEqual({
            type: actions.types.TICK,
            payload: {
                id: 1,
            },
        });
    });
    it("setDialogVisible", () => {
        expect(actions.creators.setDialogVisible(true, 1)).toEqual({
            type: actions.types.SET_DIALOG_VISIBLE,
            payload: {
                visible: true,
                id: 1,
            },
        });
    });
});
