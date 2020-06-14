import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import SignUp from './components/signup';
import Login from './components/login';
import Home from './components/home';
import FormExample from './components/formExample';
import ViewProducts from './components/viewProducts';

import { UserContext } from './contexts/UserContext';

function App() {
	const [value, setValue] = useState('No email currently (not logged in)');

	return (
		<Router>
			<Container>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand as={Link} to="/">Smart Saver</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link as={Link} to="/signup">Create Account</Nav.Link>
							<Nav.Link as={Link} to="/login">Log In</Nav.Link>
							<Nav.Link as={Link} to="/formExample">Form Example</Nav.Link>
							<Nav.Link as={Link} to="/viewProducts">Products</Nav.Link>
						</Nav>
						<Form inline>
							<FormControl type="text" placeholder="Search" className="mr-sm-2" />
							<Button variant="outline-success">Search</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
			</Container>
			<h1 style={styles.h1}>Woolies Smart Saver</h1>
			<p className="text-muted" style={styles.p}>Automatic notification of sales on your favourite Woolworths products</p>

			<UserContext.Provider value={{value, setValue}}>
				<Route path="/" exact component={Home} />
				<Route path="/signup" exact component={SignUp} />
				<Route path="/login" exact component={Login} />
				<Route path="/formExample" exact component={FormExample} />
				<Route path="/viewProducts" exact component={ViewProducts} />
			</UserContext.Provider>
		</Router>
  	);
}

const styles = {
	h1: {
		fontFamily: "Roboto, sans-serif",
		fontSize: "40px",
		fontWeight: "normal",
		textAlign: "center",
		margin: "40px"
	},

	p: {
		fontFamily: "Roboto, sans-serif",
		fontSize: "24px",
		textAlign: "center",
		margin: "20px",
	}
}

export default App;