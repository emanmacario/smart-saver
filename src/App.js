import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';

function App() {
	return (
		<Router>
			<p>Welcome to Woolies Smart Saver App!</p>
			<br />
			<Route path="/signup" exact component={Login} />
			<Route path="/home" exact component={Home} />
		</Router>
  	);
}

export default App;