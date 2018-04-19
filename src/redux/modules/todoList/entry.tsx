import { moduleName } from "./constants";
import actions from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import selectors from "./selectors";

export const TodoListModule = {
    actions,
    moduleName,
    reducers: {
        [moduleName]: reducer,
    },
    saga,
    selectors,
};

export default TodoListModule;
