import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GetAllLists } from "../../modules/list/list-actions";

export interface HomeProps extends RouteComponentProps {
    getAllLists: GetAllLists
}

export type HomeState = any;

export class Home extends React.PureComponent<HomeProps, HomeState> {

    public constructor (props: HomeProps) {
        super(props);

    }

    public componentDidMount () {
        const {getAllLists} = this.props;

        getAllLists();
    }

    public render (): React.ReactElement<HomeProps> {
        return (
            <div>
                Home component
            </div>
        )
    }
}
