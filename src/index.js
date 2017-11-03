import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TodoApp from './components/TodoApp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.css'

import configureStore from './configureStore'

const store = configureStore();

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Route path="/:filter?" component={TodoApp} />
            </Router>            
        </Provider>,
        document.getElementById('root')
    )
}

render();
