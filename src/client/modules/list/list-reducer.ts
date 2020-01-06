import { AppAction, ListState } from "../../types/resume-app";

export const iniListState = Object.freeze<ListState>({
    lists: []
});

export function listReducer (state: ListState = iniListState, action: AppAction){
    switch (action.type) {

        default:
            return {
                ...state
            }
    }
}
