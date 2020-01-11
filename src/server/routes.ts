import * as express from "express";
import { getStatusText, OK } from "http-status-codes";
import { ItemsController } from "./controllers";
import { ListController } from "./controllers/list-controller";
import {
    ROUTE_ITEM_BY_LIST_ID,
    ROUTE_ITEM_BY_LIST_ID_ITEM_ID,
    ROUTE_LISTS,
    ROUTE_LIST_BY_ID,
    ROUTE_HELTH_CHECK,
} from "./utils/constants";
import { validateListName, validatesUpdate } from "./utils/middlewares";
import { apiResponse } from "./utils/response";
import { Lists, Items } from "./models";
import { DB } from "../types/types";

/**
 * here are going to be defined all de endpoints of the server.
 *
 * @returns {import("express").Router} endpoints.
 */
export function routes (): express.Router {
    const db: DB = {
        Lists,
        Items,
    };
    const list = new ListController(db.Lists);
    const item = new ItemsController(db);

    const api: express.Router = express.Router();

    api.get(ROUTE_HELTH_CHECK, (req: express.Request, res: express.Response) => {
        return apiResponse(res, getStatusText(OK), OK);
    });

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
