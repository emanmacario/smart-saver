import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, useHistory, Redirect } from 'react-router-dom';

// React Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// Application components
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import ViewProducts from './components/ViewProducts';

// DEBUGGING
import SignUpClean from './components/SignUpClean';


function App(props) {
	const [isAuth, setIsAuth] = useState(false);
	const [username, setUsername] = useState(null);

	useEffect(() => {
		console.log("=== APP MOUNTING ===");
		console.log(`isAuth: ${isAuth}`);

		axios.get('http://localhost:5000/users/', { withCredentials: true })
			.then((res) => {
				console.log("GET /users/ response: ")
				console.log(res.data);
				if (res.data.user) {
					console.log("There is a user saved in a server session");
					setIsAuth(true);
					//useHistory().push('/viewProducts');
					setUsername(res.data.user.username);

				} else {
					console.log("There is no user saved in a session");
					//setIsAuth(false);
					//setUsername(null);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
	
	const logout = (event) => {
		event.preventDefault();
		console.log("Logging out!");
		axios.get('http://localhost:5000/users/logout/', { withCredentials: true })
			.then((res) => {
				console.log('GET /users/logout/ response:')
				console.log(res.data);
				if (res.status === 200) {
					setIsAuth(false);
					setUsername(null);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}


	return (
		<Router>
			<Container>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand as={Link} to="/">Smart Saver</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{ isAuth ? (
								<Nav className="mr-auto">
									<Nav.Link as={Link} to="/viewProducts">Products</Nav.Link>
									<Form inline>
										<Button variant="outline-secondary" onClick={logout}>Logout</Button>
									</Form>
								</Nav>
								
						) : (
								<Nav className="mr-auto">
									<Nav.Link as={Link} to="/signup">Create Account</Nav.Link>
									<Nav.Link as={Link} to="/login">Log In</Nav.Link>
								</Nav>
							)
						}
					</Navbar.Collapse>
				</Navbar>
			</Container>
			<h1 style={styles.h1}>Woolies Smart Saver</h1>
			<p className="text-muted" style={styles.p}>Automatic notification of sales on your favourite Woolworths products</p>

			<Route path="/" exact component={Home} />
			<Route path="/signup" exact render={() => (
                isAuth ? (
                    <Redirect to="/viewProducts" />
                ) : (
                    <SignUpClean />
                )
            )} />
            <Route path="/login" exact render={(props) => (
                isAuth ? (
                    <Redirect to="/viewProducts"/>
                ) : (
                    <Login {...props} setIsAuth={setIsAuth} />
                )
            )} />
			<Route path="/viewProducts" render={() => (
				isAuth ? (
                    <ViewProducts />
				) : (
					<Redirect to='/login'/>
				)
			)} />
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