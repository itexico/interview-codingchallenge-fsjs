import { AxiosRequestConfig, AxiosResponse } from "axios";
import { List } from "../../types/resume-app";
import { Api } from "../../utils/api";
import { apiConfig, ROUTE_LIST } from "../../utils/constants";

class ListApi extends Api {
    public constructor(props: AxiosRequestConfig) {
        super(props);

        this.getAllLists = this.getAllLists.bind(this);
    }

    public getAllLists(): Promise<List[]> {
        return this.get<List[]>(ROUTE_LIST).then((res: AxiosResponse<List[]>) => {
            return res.data;
        });
    }
}

export const api = new ListApi(apiConfig);
