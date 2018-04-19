import * as React from "react";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "material-ui/Dialog";
import { IMaterialComponentProps } from "../../../../utils/interfaces";
import { lang } from "../lang";
import Button from "material-ui/Button";
import withStyles from "material-ui/styles/withStyles";
import { compose, lifecycle } from "recompose";
import { ITask, ComponentConstructor } from "../interfaces";
import { connect } from "react-redux";
import TodoListModule from "../entry";
import { get } from "lodash";
import { bindActionCreators } from "redux";
import TextField from "material-ui/TextField";
import { Field, reduxForm, submit, SubmissionError, change, reset } from "redux-form";
import { mergeProps } from "../../../../utils/mergeProps";
import { FormControl, FormHelperText } from "material-ui/Form";

const styles: any = (theme) => ({
    fullWidth: {
        width: "100%",
    },
});

interface ITaskDialogProps extends IMaterialComponentProps {
    open?: boolean;
    setVisible?: (visible?: boolean, id?: number) => void;
    save?: (item: ITask) => void;
    show?: (id: number) => void;
    handleSubmit?: any;
    onSubmit?: any;
    submit?: any;
    form?: string;
    id?: number;
    item?: ITask;
    change?: (name: string, value: any) => void;
    reset?: () => void;
}

const renderTextField = (field) => {
    const { input, meta: { error }, ...otherProps } = field;
    return (
        <TextField
            margin="normal"
            {...input}
            {...otherProps}
            error={!!error}
            helperText={lang[error]}
        />
    );
};

const handleClose = (props: ITaskDialogProps) => () => {
    props.setVisible(false);
    props.reset();
};

const Component = (props: ITaskDialogProps) => {
    const { classes, open, handleSubmit, id } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Dialog onClose={handleClose(props)} open={open}>
                <DialogTitle>
                    {id ? lang["edit.task"] : lang["create.task"]}
                </DialogTitle>
                <DialogContent>
                    <Field
                        name="name"
                        component={renderTextField}
                        type="text"
                        label={lang["task.name"]}
                        className={classes.fullWidth}
                        required
                    />
                    <Field
                        name="dueDate"
                        component={renderTextField}
                        type="date"
                        label={lang["due.date"]}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.fullWidth}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose(props)} color="primary">
                        {lang.cancel}
                    </Button>
                    <Button color="primary" onClick={() => props.submit(props.form)} autoFocus>
                        {lang.save}
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};

export const TaskDialog = compose(
    withStyles(styles),
    reduxForm({
        form: `${TodoListModule.moduleName}Form`,
    }),
    connect(
        (state) => ({
            form: `${TodoListModule.moduleName}Form`,
            open: get(TodoListModule.selectors.dialog(state), "visible", false),
            id: get(TodoListModule.selectors.dialog(state), "id"),
            item: TodoListModule.selectors.show(state),
        }),
        (dispatch, ownProps) => ({
            setVisible: bindActionCreators(TodoListModule.actions.creators.setDialogVisible, dispatch),
            save: bindActionCreators(TodoListModule.actions.creators.save.request, dispatch),
            show: bindActionCreators(TodoListModule.actions.creators.show.request, dispatch),
            submit: bindActionCreators(submit, dispatch),
            change: (name: string, value: any) => bindActionCreators(change, dispatch)(ownProps.id, name, value),
            reset: () => bindActionCreators(reset, dispatch)(ownProps.id),
        }),
        mergeProps,
    ),
    lifecycle<ITaskDialogProps, undefined>({
        componentWillReceiveProps(nextProps: ITaskDialogProps) {
            if (nextProps.id && nextProps.id !== this.props.id) {
                this.props.show(nextProps.id);
            }
            if (get(nextProps, "item.id") === nextProps.id && get(this.props, "item.id") !== this.props.id) {
                this.props.change("id", nextProps.item.id);
                this.props.change("name", nextProps.item.name);
                this.props.change("dueDate", nextProps.item.dueDate);
            }
        },
    }),
)(Component as any) as ComponentConstructor<ITaskDialogProps>;
