import { Document, Model } from "mongoose";
import { Response } from "express";

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

export interface DB {
    Lists: Model<ListModel>;
    Items: Model<ItemModel>;
}

export interface ResponseTest<T> extends Response {
    success: boolean;
    message: string;
    result: T;
}
