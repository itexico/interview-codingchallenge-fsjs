import { connect } from "react-redux";
import { Home } from "../components/home";
import { getAllLists } from "../modules/list/list-actions";
import { lists } from "../modules/list/list-selectors";

const stateToProps = state => {
    return {
        lists: lists(state)
    }
};

const dispatchToPorps = {
    getAllLists: getAllLists
};

export default connect (stateToProps, dispatchToPorps)(Home);
