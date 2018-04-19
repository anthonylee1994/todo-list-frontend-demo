import { ITask } from "./interfaces";

export const moduleName = "todoList";

export const apiPath = "/api/tasks";

export const dummyTasks: ITask[] = [
    {
        id: 1,
        name: "Task 1",
        dueDate: "2018-05-01",
        position: null,
        completed: false,
        dateCreated: "2018-04-18T08:28:22.113Z",
        dateUpdated: "2018-04-18T08:28:22.113Z",
    },
    {
        id: 2,
        name: "Task 2",
        dueDate: "2018-05-02",
        position: null,
        completed: true,
        dateCreated: "2018-04-18T10:49:11.653Z",
        dateUpdated: "2018-04-18T10:49:11.653Z",
    },
];
