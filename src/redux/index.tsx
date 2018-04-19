import * as React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { MuiThemeProvider } from "material-ui/styles";
import "./style.css";
import { theme } from "./theme";

export default class ReduxWrapper extends React.PureComponent {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <div>{this.props.children}</div>
                </Provider>
            </MuiThemeProvider>
        );
    }
}
