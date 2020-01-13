import { createSelector, Selector } from "reselect";
import { AppState } from "../../types/resume-app";

const sideNav: Selector<AppState, boolean> = (state: AppState) => state.app.sideNav;
const loading: Selector<AppState, boolean> = (state: AppState) => state.app.loading;

export const toggleSideNavSelector = createSelector(sideNav, (show: boolean) => show);
export const isAppLoadingSelector = createSelector(loading, (isLoading: boolean) => isLoading);
