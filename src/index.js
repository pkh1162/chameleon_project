import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import registerServiceWorker from './registerServiceWorker';

import injectTapEventPlugin from "react-tap-event-plugin";


import App from './containers/App';
import {rootReducer} from "./reducers/rootReducer";
import './styles/index.css';


injectTapEventPlugin();

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();



