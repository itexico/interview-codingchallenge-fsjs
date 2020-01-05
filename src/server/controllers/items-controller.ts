import * as express from "express";
import { CREATED, getStatusText, NOT_ACCEPTABLE, NO_CONTENT, OK } from "http-status-codes";
import { ItemModel, NewItem } from "../../types/types";
import { ItemSchema, ListSchema } from "../models";
import { AppError } from "../utils/AppError";
import { apiResponse } from "../utils/response";

export class ItemsController {
    public constructor () {
        this.addItemByListId = this.addItemByListId.bind(this);
    }

    /**
     * Checks if the id given is from a true list.
     *
     * @private
     * @param {string} id
     * @returns
     * @memberof ItemsController
     */
    private isRrealList (id: string) {
        return ListSchema.findById(id).exec();
    }

    /**
     * `HTTP POST HANDLER` adds a new item to a list.
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns {(Promise<express.Response | void>)}
     * @memberof ItemsController
     */
    public addItemByListId (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        const { idList } = req.params;
        const item = <NewItem>req.body;

        return this.isRrealList(idList)
            .then((found) => {
                if (found === null) {
                    throw new AppError("Items must be within valid list", NOT_ACCEPTABLE);
                }

                return new ItemSchema(item).save();
            })
            .then((saved: ItemModel) => apiResponse(res, saved, CREATED))
            .catch(next);
    }

    /**
     * `HTTP *GET* HANDLER` gets the items from an specific list.
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns
     * @memberof ItemsController
     */
    public getItemsByListId (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        return ItemSchema.find({ list: req.params.idList })
            .exec()
            .then((items) => apiResponse(res, items, OK))
            .catch(next);
    }

    /**
     * `HTTP *DELETE* HANDLER` removes all the items from an specific list.
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns
     * @memberof ItemsController
     */
    public deleteItemsByListId (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        return ItemSchema.deleteMany({ list: req.params.idList })
            .exec()
            .then(() => apiResponse(res, getStatusText(NO_CONTENT), NO_CONTENT))
            .catch(next);
    }

    /**
     * `HTTP *GET* HANDLER` gets one item.
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns {(Promise<express.Response | void>)}
     * @memberof ItemsController
     */
    public getItemByListIdAndItemId (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        const { idList = "", id = "" } = req.query;

        return ItemSchema.findOne({ _id: id, list: idList })
            .exec()
            .then((item) => apiResponse(res, item, OK))
            .catch(next);
    }

    /**
     * `HTTP *DELETE* HANDLER` removes one item from a list.
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns
     * @memberof ItemsController
     */
    public deleteItemByListIdAndItemId (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        const { idList = "", id = "" } = req.query;

        return ItemSchema.deleteOne({ _id: id, list: idList })
            .exec()
            .then(() => apiResponse(res, getStatusText(NO_CONTENT), NO_CONTENT))
            .catch(next);
    }

    /**
     * `HTTP *PUT* HANDLER` updates one item from a list.
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns
     * @memberof ItemsController
     */
    public updateItemByListIdAndItemId (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        const { idList = "", id = "" } = req.query;

        const { body } = req;
        return ItemSchema.findOneAndUpdate({ _id: id, list: idList }, body, { new: true })
            .exec()
            .then((updated) => apiResponse(res, updated, NO_CONTENT))
            .catch(next);
    }
}
