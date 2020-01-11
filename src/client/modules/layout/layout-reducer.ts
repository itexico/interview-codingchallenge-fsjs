import { AppAction, AppState, LayoutState } from "../../types/resume-app";
import { TOGGLE_SIDE_NAV } from "../../utils/constants";

export const layoutIniState: LayoutState = {
    sideNav: false,
    loading: false,
};

export function layoutReducer(state: LayoutState = layoutIniState, action: AppAction): LayoutState {
    switch (action.type) {
        case TOGGLE_SIDE_NAV:
            return {
                ...state,
                sideNav: action.payload,
            };
        default:
            return { ...state };
    }
}
