import * as React from "react";
import { IMaterialComponentProps } from "../../../../utils/interfaces";
import { ITask, ComponentConstructor } from "../interfaces";
import withStyles from "material-ui/styles/withStyles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import * as classNames from "classnames";
import IconButton from "material-ui/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import ReplayIcon from "@material-ui/icons/Replay";
import DeleteIcon from "@material-ui/icons/Delete";
import DragHandleIcon from "@material-ui/icons/SwapVert";
import Grid from "material-ui/Grid";
import Checkbox from "material-ui/Checkbox";
import { compose, lifecycle } from "recompose";
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from "react-sortable-hoc";
import Tooltip from "material-ui/Tooltip";
import { lang } from "../lang";
import { connect } from "react-redux";
import TodoListModule from "../entry";
import { bindActionCreators } from "redux";

const styles: any = (theme) => ({
    task: theme.mixins.gutters({
        position: "relative",
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
    }),
    date: {
        marginBottom: theme.spacing.unit,
        fontSize: 14,
    },
    completed: {
        textDecoration: "line-through",
    },
    checkButton: {
        position: "absolute",
        top: 5,
        right: 60,
    },
    removeButton: {
        position: "absolute",
        top: 5,
        right: 5,
    },
    checkbox: {
        position: "absolute",
        left: 10,
        top: 5,
    },
    dragHandle: {
        cursor: "row-resize",
        position: "absolute",
        left: 22,
        bottom: 16,
        color: "#757575",
    },
    taskContainer: {
        cursor: "pointer",
    },
    late: {
        color: "#F44336",
        fontWeight: "bold",
    },
});

interface ITaskProps extends IMaterialComponentProps {
    value?: ITask;
    index?: number;
    selected?: number[];
    tick?: (id?: number) => void;
    update?: (data: ITask | ITask[]) => void;
    remove?: (data: ITask | ITask[]) => void;
    setDialogVisible?: (visible: boolean, id?: number) => void;
}

const markCompleted = (props: ITaskProps) => () => {
    const { value, update } = props;
    update({
        ...value,
        completed: !value.completed,
    });
};

const removeItem = (props: ITaskProps) => () => {
    const { value, remove } = props;
    remove(value);
};

const DragHandle = SortableHandle(({ classes }) => <DragHandleIcon className={classes.dragHandle} />);

const Component = (props: ITaskProps) => {
    const { value, classes } = props;
    return (
        <Paper className={classes.task} elevation={2}>
            <Tooltip title={value.completed ? lang["mark.uncompleted"] : lang["mark.completed"]}>
                <IconButton className={classes.checkButton} onClick={markCompleted(props)}>
                    {value.completed ? <ReplayIcon /> : <CheckIcon />}
                </IconButton>
            </Tooltip>
            <Tooltip title={lang.remove}>
                <IconButton className={classes.removeButton} onClick={removeItem(props)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Grid container>
                <Grid item xs={2} sm={1}>
                    <Checkbox className={classes.checkbox} onClick={() => props.tick(value.id)} checked={props.selected.indexOf(value.id) !== -1} />
                    <DragHandle classes={classes} />
                </Grid>
                <Grid item xs={10} sm={11}>
                    <div className={classes.taskContainer} onClick={() => props.setDialogVisible(true, value.id)}>
                        <Typography component="p" className={classNames({
                            [classes.date]: true,
                            [classes.late]: new Date().getTime() > new Date(value.dueDate).getTime(),
                        })} color="textSecondary">
                            {value.dueDate}
                        </Typography>
                        <Typography variant="headline" component="h2" className={classNames({ [classes.completed]: value.completed })}>
                            {value.name}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export const Task = compose(
    withStyles(styles),
    SortableElement,
    connect(
        (state) => {
            return {
                selected: TodoListModule.selectors.selected(state),
            };
        },
        (dispatch) => {
            return {
                update: bindActionCreators(TodoListModule.actions.creators.update.request, dispatch),
                remove: bindActionCreators(TodoListModule.actions.creators.remove.request, dispatch),
                tick: bindActionCreators(TodoListModule.actions.creators.tick, dispatch),
                setDialogVisible: bindActionCreators(TodoListModule.actions.creators.setDialogVisible, dispatch),
            };
        },
    ),
    lifecycle<ITaskProps, undefined>({

    }),
)(Component as any) as ComponentConstructor<ITaskProps>;
