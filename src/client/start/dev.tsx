import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { App } from "../components/app";
import { rootSagas } from "../modules";
import { store } from "../redux/store/dev";
import "../styles/index.scss";
import { unregister } from "../worker";

store.runSaga(rootSagas);
store.subscribe(() => localStorage.setItem("initApp", JSON.stringify(store.getState())));
function init (): void {
    render(
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>,
        document.getElementById("enetito")
    );
}

init();

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("../components/app", () => {
        init();
    });
}

unregister();
