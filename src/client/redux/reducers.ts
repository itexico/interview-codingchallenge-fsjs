import { combineReducers } from "redux";
import { AppState } from "resume-app";
import { listReducer } from "../modules/list/list-reducer";


export const rootReducer = combineReducers<AppState>({
    lists: listReducer
});
