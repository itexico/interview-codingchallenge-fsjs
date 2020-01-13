import { AppAction, ListState } from "../../types/resume-app";
import { GET_LISTS_SUCCESS } from "../../utils/constants";

export const iniListState = Object.freeze<ListState>({
    lists: [],
});

export function listReducer(state: ListState = iniListState, action: AppAction) {
    switch (action.type) {
        case GET_LISTS_SUCCESS:
            return {
                ...state,
                lists: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
}
