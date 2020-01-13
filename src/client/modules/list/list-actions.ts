import { AppAction, List } from "../../types/resume-app";
import {
    ADD_LISTS_FAILED,
    ADD_LISTS_REQUEST,
    ADD_LISTS_SUCCESS,
    DELETE_LISTS_FAILED,
    DELETE_LISTS_REQUEST,
    DELETE_LISTS_SUCCESS,
    GET_LISTS_FAILED,
    GET_LISTS_REQUEST,
    GET_LISTS_SUCCESS,
} from "../../utils/constants";

/**
 * Action creator to handle adding new list.
 *
 * @param {name} list value to be dispatched
 * @returns {AppAction<ADD_LISTS_REQUEST,name>} action
 */
export function addList(name: string): AppAction<ADD_LISTS_REQUEST, string> {
    return {
        type: ADD_LISTS_REQUEST,
        payload: name,
    };
}

export type AddList = typeof addList;

/**
 * Action creator nofities if the list was created successfully.
 *
 * @returns {AppAction<ADD_LISTS_SUCCESS,string>} action
 */
export function addListSuccess(): AppAction<ADD_LISTS_SUCCESS, undefined> {
    return {
        type: ADD_LISTS_SUCCESS,
        payload: undefined,
    };
}

/**
 * Action creator nofities if the list was created successfully.
 * @param {List} list value to be dispatched
 * @returns {AppAction<ADD_LISTS_FAILED,List>} action
 */
export function addListFailed(): AppAction<ADD_LISTS_FAILED, undefined> {
    return {
        type: ADD_LISTS_FAILED,
        payload: undefined,
    };
}

/**
 * Action creator to handle adding new list.
 * @param {List} list value to be dispatched
 * @returns {AppAction<ADD_LISTS_REQUEST,List>} action
 */
export function deleteList(list: List): AppAction<DELETE_LISTS_REQUEST, List> {
    return {
        type: DELETE_LISTS_REQUEST,
        payload: list,
    };
}

/**
 * Action creator nofities if the list was created successfully.
 * @param {List} list value to be dispatched
 * @returns {AppAction<DELETE_LISTS_SUCCESS,List>} action
 */
export function deleteListSuccess(): AppAction<DELETE_LISTS_SUCCESS, undefined> {
    return {
        type: DELETE_LISTS_SUCCESS,
        payload: undefined,
    };
}

/**
 * Action creator nofities if the list was created successfully.
 * @param {List} list value to be dispatched
 * @returns {AppAction<DELETE_LISTS_FAILED,List>} action
 */
export function deleteListFailed(): AppAction<DELETE_LISTS_FAILED, undefined> {
    return {
        type: DELETE_LISTS_FAILED,
        payload: undefined,
    };
}

/**
 * @description Gets all lists
 *
 * @returns all lists
 */
export function getAllLists(): AppAction<GET_LISTS_REQUEST, undefined> {
    return {
        type: GET_LISTS_REQUEST,
        payload: undefined,
    };
}
export type GetAllLists = typeof getAllLists;

/**
 * @description Gets all lists
 *
 * @returns all lists
 */
export function getAllListsFailed(error): AppAction<GET_LISTS_FAILED, Error> {
    return {
        type: GET_LISTS_FAILED,
        payload: error,
    };
}

export type GetAllListsFailed = typeof getAllListsFailed;

/**
 * @description Gets all lists
 *
 * @returns all lists
 */
export function getAllListsSuccess(lists: List[]): AppAction<GET_LISTS_SUCCESS, List[]> {
    return {
        type: GET_LISTS_SUCCESS,
        payload: lists,
    };
}

export type GetAllListsSuccess = typeof getAllListsSuccess;
