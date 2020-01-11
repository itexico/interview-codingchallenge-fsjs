import * as express from "express";
import { CREATED, getStatusText, NOT_FOUND, NO_CONTENT, OK } from "http-status-codes";
import { Model } from "mongoose";
import { ListInfo, ListModel } from "../../types/types";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";
import { apiResponse } from "../utils/response";

export class ListController {
    public constructor (private ListSchema: Model<ListModel>) {
        this.getAllLists = this.getAllLists.bind(this);
        this.getListById = this.getListById.bind(this);
        this.addList = this.addList.bind(this);
        this.deleteListById = this.deleteListById.bind(this);
        this.getListById = this.getListById.bind(this);
        this.updateListById = this.updateListById.bind(this);
    }

    /**
     *
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns {(Promise<express.Response | void>)}
     * @memberof ListController
     */
    public getAllLists (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        logger.debug("getAllLists");
        return this.ListSchema.find({})
            .exec()
            .then((lists: ListModel[]) => apiResponse<ListModel[]>(res, lists, OK))
            .catch(next);
    }

    /**
     *
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns {(Promise<express.Response | void>)}
     * @memberof ListController
     */
    public getListById (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        logger.debug("getListById");

        return this.ListSchema.findById({ id: req.params.id })
            .exec()
            .then((list) => {
                if (!list) {
                    throw new AppError("List was not found", NOT_FOUND);
                }

                return apiResponse(res, list, OK);
            })
            .catch(next);
    }

    /**
     *
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns {(Promise<express.Response | void>)}
     * @memberof ListController
     */
    public addList (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        return new this.ListSchema(<ListInfo>req.body)
            .save()
            .then(() => apiResponse(res, getStatusText(CREATED), CREATED))
            .catch(next);
    }

    /**
     *
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns {(Promise<express.Response | void>)}
     * @memberof ListController
     */
    public deleteListById (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        logger.debug("deleteListById");
        return this.ListSchema.findByIdAndDelete(req.params.id)
            .exec()
            .then(() => apiResponse(res, getStatusText(NO_CONTENT), NO_CONTENT))
            .catch(next);
    }

    /**
     *
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns {(Promise<express.Response | void>)}
     * @memberof ListController
     */
    public updateListById (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response | void> {
        return this.ListSchema.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
            .then(() => apiResponse<string>(res, getStatusText(NO_CONTENT), NO_CONTENT))
            .catch(next);
    }
}
