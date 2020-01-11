import { connect } from "react-redux";
import { Home } from "../components/home";
import { getAllLists } from "../modules/list/list-actions";
import { lists } from "../modules/list/list-selectors";
import { toggleSideNav } from "../modules/layout/layout-actions";
import { AppState } from "../types/resume-app";
import { toggleSideNavSelector, isAppLoadingSelector } from "../modules/layout/layout-selectors";

const stateToProps = (state: AppState) => {
    return {
        sideNav: toggleSideNavSelector(state),
        isLoading: isAppLoadingSelector(state),
        lists: lists(state),
    };
};

const dispatchToPorps = {
    getAllLists,
};

export default connect(stateToProps, dispatchToPorps)(Home);
