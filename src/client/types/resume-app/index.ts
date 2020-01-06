import { Action } from "redux";
import "resume-app";

declare module "resume-app" {

    interface ItemModel {
        "_id": string;
        name: string;
        description?: string;
        list: string;
    }

    interface AppAction<T = string, P = any> extends Action {
        type: T;
        payload: P;
    }

    interface List {
        name: string;
        "_id": string;
        items?: ItemModel[];
    }

    interface ListState {
        lists: List[]
    }

    interface AppState {
        lists: ListState;
    }

}
