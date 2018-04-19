import { ComponentClass, StatelessComponent } from "react";

export interface ITask {
    _id?: number;
    id?: number;
    name?: string;
    dueDate?: Date | string;
    position?: number;
    completed?: boolean;
    dateCreated?: Date | string;
    dateUpdated?: Date | string;
}

export type ComponentConstructor<P> = ComponentClass<P> | StatelessComponent<P>;
