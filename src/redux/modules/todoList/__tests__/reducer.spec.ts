import reducer from "../reducer";
import actions from "../actions";
import { dummyTasks } from "../constants";

describe("Todo list reducer", () => {

    // LIST
    it("list.request", () => {
        expect(reducer({}, actions.creators.list.request())).toEqual({
            status: { list: "request" },
        });
    });
    it("list.success", () => {
        expect(reducer({}, actions.creators.list.success(dummyTasks))).toEqual({
            status: { list: "success" },
            items: dummyTasks,
        });
    });
    it("list.failure", () => {
        expect(reducer({}, actions.creators.list.failure(
            actions.creators.list.request(),
            null,
        ))).toEqual({
            status: { list: "failure" },
        });
    });

    // SHOW
    it("show.request", () => {
        expect(reducer({}, actions.creators.show.request(1))).toEqual({
            status: { show: "request" },
        });
    });
    it("show.success", () => {
        expect(reducer({}, actions.creators.show.success(dummyTasks[0]))).toEqual({
            status: { show: "success" },
            item: dummyTasks[0],
        });
    });
    it("show.failure", () => {
        expect(reducer({}, actions.creators.show.failure(
            actions.creators.show.request(1),
            null,
        ))).toEqual({
            status: { show: "failure" },
        });
    });

    // SAVE
    it("save.request", () => {
        expect(reducer({
            items: [dummyTasks[0]],
        }, actions.creators.save.request(dummyTasks[1]))).toEqual({
            items: [dummyTasks[0]],
            status: { save: "request" },
        });
    });
    it("save.success", () => {
        expect(reducer({
            items: [dummyTasks[0]],
        }, actions.creators.save.success(dummyTasks[1]))).toEqual({
            status: { save: "success" },
            items: [dummyTasks[1], dummyTasks[0]],
        });
    });
    it("save.failure", () => {
        expect(reducer({
            items: [dummyTasks[0]],
        }, actions.creators.save.failure(
            actions.creators.save.request(dummyTasks[1]),
            null,
            )),
        ).toEqual({
            items: [dummyTasks[0]],
            status: { save: "failure" },
        });
    });
    // UPDATE
    it("update.request.single", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.update.request({
            ...dummyTasks[1],
            name: "x",
        }))).toEqual({
            items: dummyTasks,
            status: { update: "request" },
        });
    });
    it("update.success.single", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.update.success({
            ...dummyTasks[1],
            name: "x",
        }))).toEqual({
            items: [
                dummyTasks[0],
                {
                    ...dummyTasks[1],
                    name: "x",
                },
            ],
            status: { update: "success" },
        });
    });
    it("update.failure.single", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.update.failure(
            actions.creators.update.request(dummyTasks[1]),
            null,
            )),
        ).toEqual({
            items: dummyTasks,
            status: { update: "failure" },
        });
    });
    it("update.request.multiple", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.update.request([
            {
                ...dummyTasks[0],
                name: "x",
            },
            {
                ...dummyTasks[1],
                name: "y",
            },
        ]))).toEqual({
            items: dummyTasks,
            status: { update: "request" },
        });
    });
    it("update.success.multiple", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.update.success([
            {
                ...dummyTasks[0],
                name: "x",
            },
            {
                ...dummyTasks[1],
                name: "y",
            },
        ]))).toEqual({
            items: [
                {
                    ...dummyTasks[0],
                    name: "x",
                },
                {
                    ...dummyTasks[1],
                    name: "y",
                },
            ],
            status: { update: "success" },
        });
    });
    it("update.failure.multiple", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.update.failure(
            actions.creators.update.request([
                {
                    ...dummyTasks[0],
                    name: "x",
                },
                {
                    ...dummyTasks[1],
                    name: "y",
                },
            ]),
            null,
            )),
        ).toEqual({
            items: dummyTasks,
            status: { update: "failure" },
        });
    });
    // REMOVE
    it("remove.request.single", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.remove.request(dummyTasks[1]))).toEqual({
            items: dummyTasks,
            status: { remove: "request" },
        });
    });
    it("remove.success.single", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.remove.success(dummyTasks[1]))).toEqual({
            items: [
                dummyTasks[0],
            ],
            status: { remove: "success" },
        });
    });
    it("update.failure.single", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.remove.failure(
            actions.creators.remove.request(dummyTasks[1]),
            null,
            )),
        ).toEqual({
            items: dummyTasks,
            status: { remove: "failure" },
        });
    });
    it("remove.request.multiple", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.remove.request(dummyTasks))).toEqual({
            items: dummyTasks,
            status: { remove: "request" },
        });
    });
    it("remove.success.multiple", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.remove.success(dummyTasks))).toEqual({
            items: [],
            status: { remove: "success" },
        });
    });
    it("remove.failure.multiple", () => {
        expect(reducer({
            items: dummyTasks,
        }, actions.creators.remove.failure(
            actions.creators.remove.request(dummyTasks),
            null,
            )),
        ).toEqual({
            items: dummyTasks,
            status: { remove: "failure" },
        });
    });
    it("tick 1", () => {
        expect(reducer(
            {
                selected: [2],
            },
            actions.creators.tick(1),
        )).toEqual({
            selected: [1, 2],
        });
    });
    it("un-tick 2", () => {
        expect(reducer(
            {
                selected: [1, 2],
            },
            actions.creators.tick(2),
        )).toEqual({
            selected: [1],
        });
    });
    it("setDialogVisible true", () => {
        expect(reducer(
            {},
            actions.creators.setDialogVisible(true, 1),
        )).toEqual({
            dialog: {
                visible: true,
                id: 1,
            },
        });
    });
    it("setDialogVisible false", () => {
        expect(reducer(
            {
                dialog: {
                    visible: true,
                    id: 1,
                },
            },
            actions.creators.setDialogVisible(false),
        )).toEqual({
            dialog: {
                visible: false,
                id: undefined,
            },
        });
    });
});
