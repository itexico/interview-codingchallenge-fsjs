import React from "react"
import ReactDOM from "react-dom"

import App from '../components/stateful/App';

const root = document.getElementById("root");
root ? ReactDOM.render(<App />, root) : false;