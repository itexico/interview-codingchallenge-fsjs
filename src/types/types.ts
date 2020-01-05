import { Document } from "mongoose";

export interface ListModel extends Document {
    name: { type: String; unique: boolean; required: boolean };
}

export interface ItemModel extends Document {
    name: { type: string; required: boolean };
    idList: ListModel["_id"];
}

export interface ListInfo {
    name: string;
}

export interface NewItem {
    name: string;
    description?: string;
}
