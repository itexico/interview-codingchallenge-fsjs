import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route } from "react-router-dom";
import { Layout } from "../../hoc/layout";
import { Header } from "../../hoc/header";
import { Main } from "../../hoc/main";
import { SideNav } from "../../hoc/side-nav";
import { HOME } from "../../utils/constants";
import { Home } from "../../containers";

function App(): React.ReactElement {
    return (
        <div className="eneto">
            <Layout>
                <BrowserRouter>
                    <Header>
                        <button type="button"> button</button>
                        <span>Header</span>
                    </Header>
                    <Main>
                        <SideNav>
                            <div>link</div>
                        </SideNav>
                        <main>
                            <Route exact path={HOME} component={Home} />
                        </main>
                    </Main>
                </BrowserRouter>
            </Layout>
        </div>
    );
}

export default hot(module)(App);
