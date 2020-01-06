import { put } from "redux-saga/effects";
import { getAllListsFailed } from "./list-actions";

export function* getAllListWorker () {
    try {

    } catch (error) {
       yield put(getAllListsFailed(error))
    }
}
