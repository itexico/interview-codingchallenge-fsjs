import { createSelector } from "reselect";
import { AppState } from "../../types/resume-app";

const getLists = (state: AppState) => state.lists;

export const lists = createSelector(getLists, (lists) => lists);
