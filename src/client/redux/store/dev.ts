import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { AppState } from "../../types/resume-app";
import { rootReducer } from "../reducers";

const state = {
    lists: [],
    app: {
        sideNav: false,
        loading: false,
    },
};

function configureStore(initialState: AppState) {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];

    return {
        ...createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware))),
        runSaga: sagaMiddleware.run,
    };
}

export const store = configureStore(JSON.parse(localStorage.getItem("initApp") || JSON.stringify(state)));
