import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "../components/app/";
import { rootSagas } from "../modules";
import { configureStore } from "../redux/store/prod";
import "../styles/index.scss";
import { unregister } from "../worker";

const store = configureStore({});
store.runSaga(rootSagas);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("enetito")
);

unregister();
