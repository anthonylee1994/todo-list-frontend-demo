import * as React from "react";
import { IMaterialComponentProps } from "../../../../utils/interfaces";
import { withStyles } from "material-ui/styles";
import { compose, lifecycle } from "recompose";
import Typography from "material-ui/Typography";
import { ITask } from "../interfaces";
import { dummyTasks } from "../constants";
import { Task } from "./Task";
import { get } from "lodash";

import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from "react-sortable-hoc";
import { connect } from "react-redux";
import TodoListModule from "../entry";
import { stat } from "fs";
import { bindActionCreators } from "redux";
import { CircularProgress } from "material-ui/Progress";
import { lang } from "../lang";

const styles: any = (theme) => ({
    root: {
        width: "100%",
        maxWidth: 680,
        margin: `${theme.spacing.unit * 2}px auto`,
    },
    noTasks: {
        padding: `${theme.spacing.unit * 4}px`,
        textAlign: "center",
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

interface ITodoListProps extends IMaterialComponentProps {
    children?: any;
    items?: ITask[];
    list?: () => void;
    update?: (data: ITask | ITask[]) => void;
    status?: any;
}

const onSortEnd = ({ items, update }: ITodoListProps) => ({ oldIndex, newIndex }) => {
    update(
        ((arrayMove(items, oldIndex, newIndex) || []) as ITask[]).map((x, i) => ({
            id: x.id,
            position: i + 1,
        })),
    );
};

const SortableList = SortableContainer(({ classes, items }) => {
    return (
        <div className={classes.root}>
            {items.length === 0 ? (
                <Typography variant="display1" color="textSecondary" className={classes.noTasks}>
                    {lang["no.task"]}
                </Typography>
            ) : null}
            {items.map((item, index) => (
                <Task value={item} key={`item-${index}`} index={index} />
            ))}
        </div>
    );
});

const Component = (props: ITodoListProps) => {
    const {
        classes,
        items,
    } = props;

    if (get(props, "status.list") === "request") {
        return (
            <div style={{ textAlign: "center", marginTop: 100 }}>
                <CircularProgress className={classes.progress} size={60} />
            </div>
        );
    }

    return (
        <SortableList
            classes={classes}
            items={items}
            onSortEnd={onSortEnd(props)}
            useDragHandle={true}
        />
    );
};

export const TodoList = compose(
    withStyles(styles),
    connect(
        (state) => {
            return {
                items: TodoListModule.selectors.list(state).sort((a, b) => {
                    if (a.position && b.position) {
                        return a.position - b.position;
                    }
                    return a.id - b.id;
                }),
                status: TodoListModule.selectors.status(state),
            };
        },
        (dispatch) => {
            return {
                list: bindActionCreators(TodoListModule.actions.creators.list.request, dispatch),
                update: bindActionCreators(TodoListModule.actions.creators.update.request, dispatch),
            };
        },
    ),
    lifecycle<ITodoListProps, undefined>({
        componentWillMount() {
            this.props.list();
        },
    }),
)(Component);
