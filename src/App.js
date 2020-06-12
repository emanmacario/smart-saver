import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import SignUp from './components/signup';
import Login from './components/login';
import Home from './components/home';

function App() {
	return (
		<Router>
			<Container>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="#home">Woolies Smart Saver</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="/home">Home</Nav.Link>
							<Nav.Link href="/login">Log In</Nav.Link>
							<Nav.Link href="/signup">Create Account</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Container>
			
			<h1 style={styles.h1}>Woolies Smart Saver</h1>
			<p className="text-muted" style={styles.p}>Automatic notification on sales of your favourite Woolworths products</p>
			

			<br />
			<Route path="/signup" exact component={SignUp} />
			<Route path="/home" exact component={Home} />
			<Route path="/login" exact component={Login} />
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