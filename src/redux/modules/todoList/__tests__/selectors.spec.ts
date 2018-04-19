import selectors from "../selectors";
import { dummyTasks } from "../constants";

describe("Todo list selectors", () => {
    it("list", () => {
        expect(selectors.list({
            todoList: {
                items: dummyTasks,
            },
        })).toEqual(dummyTasks);
    });
    it("show", () => {
        expect(selectors.show({
            todoList: {
                item: dummyTasks[0],
            },
        })).toEqual(dummyTasks[0]);
    });
    it("status", () => {
        expect(selectors.status({
            todoList: {
                status: {
                    save: "success",
                },
            },
        })).toEqual({
            save: "success",
        });
    });
    it("selected", () => {
        expect(selectors.selected({
            todoList: {
                selected: [1, 2],
            },
        })).toEqual([1, 2]);
    });
    it("dialog", () => {
        expect(selectors.dialog({
            todoList: {
                dialog: {
                    visible: true,
                    id: 1,
                },
            },
        })).toEqual({
            visible: true,
            id: 1,
        });
    });
});
