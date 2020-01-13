import { put, call } from "redux-saga/effects";
import { getAllListsFailed, getAllListsSuccess } from "./list-actions";
import { api } from "./list-api";

export function* getAllListWorker() {
    try {
        console.log("getAllListWorker");

        const list = yield call(api.getAllLists);

        yield put(getAllListsSuccess(list));
    } catch (error) {
        yield put(getAllListsFailed(error));
    }
}
