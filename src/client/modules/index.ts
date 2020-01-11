import { all } from "redux-saga/effects";
import { listWatchers } from "./list/list-watchers";

export function* rootSagas() {
    yield all([...listWatchers]);
}
