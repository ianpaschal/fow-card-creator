import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';
import { db } from './firebase';
import App from './components/App';
import 'firebase/firestore';
import './style/index.scss';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App db={db}/>
		</Router>
	</Provider>,
	document.getElementById('root')
);
