import { fork, takeEvery } from "redux-saga/effects";
import { GET_LISTS_REQUEST } from "../../utils/constants";
import {getAllListWorker} from "./list-worker";

function* getAllListWatcher () {
    yield takeEvery(GET_LISTS_REQUEST, getAllListWorker);
}

export const listWatchers = [
    fork(getAllListWatcher)
]
