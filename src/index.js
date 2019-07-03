import React from 'react';
import {
	Router,
	hashHistory
} from 'react-router';
import {
	Provider
} from 'react-redux';
import {
	render
} from 'react-dom';
import configureStore from './untils/configureStore';
import routes from './routes';//得到路由

const store = configureStore();
render(
	<Provider store={store}>
		<Router 
			history={hashHistory}
			routes={routes(store)}> 
		</Router>
	</Provider>,
	document.getElementById('app')
);