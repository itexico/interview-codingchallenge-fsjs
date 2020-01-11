import { combineReducers } from "redux";
import { AppState } from "../types/resume-app";
import { listReducer } from "../modules/list/list-reducer";
import { layoutReducer } from "../modules/layout/layout-reducer";

export const rootReducer = combineReducers<AppState>({
    lists: listReducer,
    app: layoutReducer,
});
