import * as React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { IMaterialComponentProps } from "../utils/interfaces";

const styles: any = (theme) => ({
});

interface IDefaultLayoutProps extends IMaterialComponentProps {
    children?: any;
}

const DefaultLayout = (props: IDefaultLayoutProps) => {
    const { classes } = props;
    return (
        <div>
            {props.children}
        </div>
    );
};

export default withStyles(styles)(DefaultLayout);
