import { AppAction } from "../../types/resume-app";
import { TOGGLE_SIDE_NAV } from "../../utils/constants";
/**
 * Action creator to handle the sidenav
 * @param {boolean} show value to be dispatched
 * @returns {AppAction<TOGGLE_SIDE_NAV,boolean>} action
 */
export function toggleSideNav(show: boolean): AppAction<TOGGLE_SIDE_NAV, boolean> {
    return {
        type: TOGGLE_SIDE_NAV,
        payload: show,
    };
}
