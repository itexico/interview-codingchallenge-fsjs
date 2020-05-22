import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import NotFoundPage from "./pages/NotFoundPage";
import ItemsPage from "./pages/ItemsPage";
import ListsPage from "./pages/ListsPage";

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :root {
    --color-main: #818BAF;
    --color-main-soft: #F2F5FF;
    --colot-main-hard: #606D9D;
    --color-contrast: #73F596;
    --color-contrast-soft: #B2F5B9;
    --color-contrast-dark: #31BF41;
    --color-shadow: #CAD1EA;
  }

  ::placeholder {
    color: var(--color-shadow);
    opacity: 1;
  }

  body {
    font-size: 1.2rem;
    font-family: 'Poppins', 'helvetica', 'arial';
    color: var(--color-main);
  }

  h1, h2 {
    line-height: 1;
  }

  h1 {
    font-size: 3rem;
    color: var(--color-contrast);
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <ListsPage />
          </Route>
          <Route exact path="/list/:listId">
            <ItemsPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
