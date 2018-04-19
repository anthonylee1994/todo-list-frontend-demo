import * as React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { IMaterialComponentProps } from "../../../../utils/interfaces";
import { lang } from "../lang";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import CreateIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Delete";
import TickIcon from "@material-ui/icons/DoneAll";
import Hidden from "material-ui/Hidden";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TodoListModule from "../entry";
import { ITask } from "../interfaces";
import { ITodoListState } from "../reducer";

const styles: any = (theme) => ({
    center: {
        justifyContent: "space-between",
    },
    root: {
        flexGrow: 1,
    },
    title: {
        flex: 1,
        marginRight: 20,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    children: {
        marginTop: 72,
        [theme.breakpoints.up("sm")]: {
            marginTop: 80,
        },
    },
});

interface ITodoListAppBar extends IMaterialComponentProps {
    children?: any;
    setDialogVisible?: (visible: boolean, id?: number) => void;
    selected?: number[];
    remove?: (data: ITask | ITask[]) => void;
    update?: (data: ITask | ITask[]) => void;
    clearSelection?: () => void;
}

const openDialog = (props: ITodoListAppBar) => () => {
    props.setDialogVisible(true);
};

const removeSelected = (props: ITodoListAppBar) => () => {
    const { selected } = props;
    const selectionMode = selected.length > 0;
    props.remove(selected.map((x) => ({ id: x }) as ITask));
    props.clearSelection();
};

const markCompletedSelected = (props: ITodoListAppBar) => () => {
    const { selected } = props;
    const selectionMode = selected.length > 0;
    props.update(selected.map((x) => ({ id: x, completed: true }) as ITask));
    props.clearSelection();
};

const Component = (props: ITodoListAppBar) => {
    const { classes, selected } = props;
    const selectionMode = selected.length > 0;
    return (
        <div className={classes.root}>
            <AppBar position="fixed" color={selectionMode ? "secondary" : "primary"}>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.title}>
                        {selectionMode ? selected.length + " " + lang["items.selected"] : lang["todo.list"]}
                    </Typography>
                    <Hidden smDown>
                        {selectionMode ? (
                            <div>
                                <Button color="inherit" onClick={markCompletedSelected(props)}>
                                    <TickIcon className={classes.leftIcon} />
                                    {lang["mark.completed"] + " " + lang.selected}
                                </Button>
                                <Button color="inherit" onClick={removeSelected(props)}>
                                    <RemoveIcon className={classes.leftIcon} />
                                    {lang.remove + " " + lang.selected}
                                </Button>
                            </div>
                        ) : (
                                <Button color="inherit" onClick={openDialog(props)}>
                                    <CreateIcon className={classes.leftIcon} />
                                    {lang["create.task"]}
                                </Button>
                            )}
                    </Hidden>
                    <Hidden mdUp>
                        {selectionMode ? (
                            <div>
                                <Tooltip title={lang["mark.completed"] + " " + lang.selected}>
                                    <IconButton color="inherit" onClick={markCompletedSelected(props)}>
                                        <TickIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={lang.remove + " " + lang.selected}>
                                    <IconButton color="inherit" onClick={removeSelected(props)}>
                                        <RemoveIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) : (
                                <Tooltip title={lang["create.task"]}>
                                    <IconButton color="inherit" onClick={openDialog(props)}>
                                        <CreateIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                    </Hidden>
                </Toolbar>
            </AppBar>
            <div className={classes.children}>
                {props.children}
            </div>
        </div>
    );
};

export const TodoListAppBar = compose(
    withStyles(styles),
    connect(
        (state) => {
            return {
                selected: TodoListModule.selectors.selected(state),
            };
        },
        (dispatch) => {
            return {
                setDialogVisible: bindActionCreators(TodoListModule.actions.creators.setDialogVisible, dispatch),
                clearSelection: bindActionCreators(TodoListModule.actions.creators.clearSelection, dispatch),
                remove: bindActionCreators(TodoListModule.actions.creators.remove.request, dispatch),
                update: bindActionCreators(TodoListModule.actions.creators.update.request, dispatch),
            };
        },
    ),
)(Component);
