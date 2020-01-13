import * as qs from "qs";

export const HOME = "/";
export const ROUTE_LIST = process.env.ROUTE_LISTS || "";
export const ROUTE_LIST_BY_iD = process.env.ROUTE_LIST_BY_iD || "";
export const ROUTE_ITEM_BY_LIST_ID = process.env.ROUTE_ITEM_BY_LIST_ID || "";
export const ROUTE_ITEM_BY_LIST_ID_ITEM_ID = process.env.ROUTE_ITEM_BY_LIST_ID_ITEM_ID || "";

export const apiConfig = {
    timeout: 15000,
    baseURL: process.env.ENETO_API || "http://localhost:5000",
     headers: {
        common: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        post: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        get: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    },
    paramsSerializer: (params) => qs.stringify(params, { indices: false }),
};
export const GET_LISTS_REQUEST = "GET_LISTS_REQUEST";
export type GET_LISTS_REQUEST = typeof GET_LISTS_REQUEST;
export const GET_LISTS_FAILED = "GET_LISTS_FAILED";
export type GET_LISTS_FAILED = typeof GET_LISTS_FAILED;
export const GET_LISTS_SUCCESS = "GET_LISTS_SUCCESS";
export type GET_LISTS_SUCCESS = typeof GET_LISTS_SUCCESS;

export const ADD_LISTS_REQUEST = "ADD_LISTS_REQUEST";
export type ADD_LISTS_REQUEST = typeof ADD_LISTS_REQUEST;
export const ADD_LISTS_FAILED = "ADD_LISTS_FAILED";
export type ADD_LISTS_FAILED = typeof ADD_LISTS_FAILED;
export const ADD_LISTS_SUCCESS = "ADD_LISTS_SUCCESS";
export type ADD_LISTS_SUCCESS = typeof ADD_LISTS_SUCCESS;

export const DELETE_LISTS_REQUEST = "DELETE_LISTS_REQUEST";
export type DELETE_LISTS_REQUEST = typeof DELETE_LISTS_REQUEST;
export const DELETE_LISTS_FAILED = "DELETE_LISTS_FAILED";
export type DELETE_LISTS_FAILED = typeof DELETE_LISTS_FAILED;
export const DELETE_LISTS_SUCCESS = "DELETE_LISTS_SUCCESS";
export type DELETE_LISTS_SUCCESS = typeof DELETE_LISTS_SUCCESS;

export const UPDATE_LISTS_REQUEST = "UPDATE_LISTS_REQUEST";
export type UPDATE_LISTS_REQUEST = typeof UPDATE_LISTS_REQUEST;
export const UPDATE_LISTS_FAILED = "UPDATE_LISTS_FAILED";
export type UPDATE_LISTS_FAILED = typeof UPDATE_LISTS_FAILED;
export const UPDATE_LISTS_SUCCESS = "UPDATE_LISTS_SUCCESS";
export type UPDATE_LISTS_SUCCESS = typeof UPDATE_LISTS_SUCCESS;
export const TOGGLE_SIDE_NAV = "TOGGLE_SIDE_NAV";
export type TOGGLE_SIDE_NAV = typeof TOGGLE_SIDE_NAV;
