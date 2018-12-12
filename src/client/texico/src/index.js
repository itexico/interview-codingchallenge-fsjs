import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import reducers  from './reducers';

const store = createStore(reducers,{},applyMiddleware(reduxThunk));

ReactDOM.render(<Provider store={store}>
	<App/>
	</Provider>   ,
	 document.getElementById('root'));

