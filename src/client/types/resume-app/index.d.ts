import { Action } from "redux";

export interface ItemModel {
    _id: string;
    name: string;
    description?: string;
    list: string;
}

export interface AppAction<T = string, P = any> extends Action {
    type: T;
    payload: P;
}

export interface List {
    name: string;
    _id: string;
    items?: ItemModel[];
}

export interface ListState {
    lists: List[];
}

export interface LayoutState {
    sideNav: boolean;
    loading: boolean;
}

export interface AppState {
    lists: ListState;
    app: LayoutState;
}
