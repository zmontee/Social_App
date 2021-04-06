import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {dataReducer} from "./reducers/dataReducer";
import thunkMiddleware from "redux-thunk";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";

const reducers = combineReducers({
    data: dataReducer,
    user: userReducer,
    ui: uiReducer
})

const store = createStore(reducers,
    compose(applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

window.store = store;

export default store;