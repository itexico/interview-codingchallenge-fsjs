import express from "express";
import { ItemsController } from "./controllers";
import { ListController } from "./controllers/list-controller";
import { ROUTE_ITEM_BY_LIST_ID, ROUTE_ITEM_BY_LIST_ID_ITEM_ID, ROUTE_LISTS, ROUTE_LIST_BY_ID } from "./utils/constants";
import { validateListName, validatesUpdate } from "./utils/middlewares";

/**
 * here are going to be defined all de endpoints of the server.
 *
 * @returns {import("express").Router} endpoints.
 */
export function routes (): express.Router {
    const list = new ListController();
    const item = new ItemsController();

    const api: express.Router = express.Router();

    api.route(ROUTE_LISTS)
        .post([validateListName], list.addList)
        .get(list.getAllLists);

    api.route(ROUTE_LIST_BY_ID)
        .put([validatesUpdate], list.updateListById)
        .get(list.getListById)
        .delete(list.deleteListById);

    api.route(ROUTE_ITEM_BY_LIST_ID)
        .get(item.getItemsByListId)
        .post(item.addItemByListId)
        .delete(item.deleteItemsByListId);

    api.route(ROUTE_ITEM_BY_LIST_ID_ITEM_ID)
        .get(item.getItemByListIdAndItemId)
        .delete(item.deleteItemByListIdAndItemId)
        .put(item.updateItemByListIdAndItemId);

    return api;
}
