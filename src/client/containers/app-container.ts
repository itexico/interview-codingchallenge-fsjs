import { connect } from "react-redux";
import { AppState } from "../types/resume-app";
import { App } from "../components/app";

const toProps = (state: AppState) => {
    return null;
};

const toDispatch = null;

export default function AppComponent() {
    return connect(toProps, toDispatch)(App);
}
