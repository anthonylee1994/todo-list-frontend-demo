import * as React from "react";
import Link from "umi/link";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { IMaterialComponentProps } from "../../utils/interfaces";
import { TodoListAppBar } from "../../redux/modules/todoList/components/TodoListAppBar";
import { TodoList } from "../../redux/modules/todoList/components/TodoList";
import { compose, lifecycle } from "recompose";
import { TaskDialog } from "../../redux/modules/todoList/components/TaskDialog";
import { Field, reduxForm, submit, SubmissionError, reset } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TodoListModule from "../../redux/modules/todoList/entry";
import { ITask } from "../../redux/modules/todoList/interfaces";

const styles = (theme) => ({
    root: {
        margin: theme.spacing.unit * 2,
    },
});

const submit = (props: IPageProps) => async (values) => {
    if (!values.name) {
        throw new SubmissionError({
            name: "required",
        });
    }
    if (!values.dueDate) {
        throw new SubmissionError({
            dueDate: "required",
        });
    }
    if (isNaN(new Date(values.dueDate).getTime())) {
        throw new SubmissionError({
            dueDate: "invalid.date",
        });
    }
    if (values.id) {
        props.update(values);
    } else {
        props.save(values);
    }
    props.setDialogVisible(false);
    props.reset();
};

const preSubmit = (props: IPageProps) => (values) => {
    return submit(props)(values);
};

const Page = (props: IPageProps) => {
    const { classes } = props;
    return (
        <TodoListAppBar>
            <div className={classes.root}>
                <TodoList />
            </div>
            <TaskDialog onSubmit={preSubmit(props)} />
        </TodoListAppBar>
    );
};

interface IPageProps extends IMaterialComponentProps {
    save?: (item: ITask) => void;
    update?: (item: ITask) => void;
    setDialogVisible?: (visible: boolean, id?: number) => void;
    reset?: () => void;
}

export default compose(
    withStyles(styles),
    connect(
        (state) => ({}),
        (dispatch) => ({
            save: bindActionCreators(TodoListModule.actions.creators.save.request, dispatch),
            update: bindActionCreators(TodoListModule.actions.creators.update.request, dispatch),
            reset: () => bindActionCreators(reset, dispatch)(`${TodoListModule.moduleName}Form`),
            setDialogVisible: bindActionCreators(TodoListModule.actions.creators.setDialogVisible, dispatch),
        }),
    ),
    lifecycle({
        componentWillMount() {
            document.body.style.background = "#f1f1f1";
        },
        componentWillUnmount() {
            document.body.style.background = "transparent";
        },
    }),
)(Page as any);
