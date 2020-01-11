import * as React from "react";
import { ListModel } from "../../../types/types";
import { GetAllLists } from "../../modules/list/list-actions";

export interface HomeProps {
    sideNav: boolean;
    isLoading: boolean;
    lists: ListModel[];
    getAllLists: GetAllLists;
}

export interface HomeState {
    [x: string]: string;
}

export class Home extends React.Component<HomeProps, HomeState> {
    public state: HomeState;

    public constructor(props: HomeProps) {
        super(props);

        this.state = {
            listName: "",
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    public componentDidMount(): void {
        console.log("COmponenetMounted");
        const { getAllLists } = this.props;

        getAllLists();
    }

    private onChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.currentTarget;
        this.setState({ [name]: value });
    }

    public render(): React.ReactElement<HomeProps> {
        const {listName} = this.state;
        return (<div>
            <input type="text" value={listName} onChange={this.onChangeHandler} />
        </div>)
    }
}
