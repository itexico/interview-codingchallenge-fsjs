import { AxiosRequestConfig, AxiosResponse } from "axios";
import { OK } from "http-status-codes";
import { ItemModel } from "resume-app";
import { Api } from "../../utils/api";

export class ItemApi extends Api {
    public constructor (props: AxiosRequestConfig) {
        super(props);

        this.getItemsByListId = this.getItemsByListId.bind(this);
    }

    public getItemsByListId (id: string): Promise<ItemModel[] | void> {
        return this.get<ItemModel[]>(process.env.ROUTE_LISTS)
            .then((result: AxiosResponse<ItemModel>) =>{
                if (result.status === OK) {
                    return result.data
                }
            }).catch(error => {
                throw error;
            })
    }
}
