import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import homeContaier from "../../containers/home-contaier";
import { Header, Layout, Main, SideNav } from "../../hoc";
import { HOME } from "../../utils/constants";

function MainComponent (): React.ReactElement {
    return (
        <Layout>
            <BrowserRouter>
                <SideNav>
                    <nav>SideNav</nav>
                </SideNav>
                <Main>
                    <Header>
                        <div>Header</div>
                        <div>son 2</div>
                    </Header>
                    <main className="app-layout-main__content">
                        <Switch>
                        <Route exact path={HOME} component={homeContaier} />
                        </Switch>
                    </main>
                </Main>
            </BrowserRouter>
        </Layout>
    );
}

export const App = process.env.NODE_ENV === "development" ? hot(module)(MainComponent) : MainComponent;
