import { combineReducers } from "redux";

import favorites from "./favorites";
import user from "./user";


export default combineReducers({
    favorites: favorites,
    user: user
})