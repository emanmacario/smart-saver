import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login(props) {
	const [email, setEmail] = useState(null);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const user = {
			email: email,
			username: username,
			password: password
		}

		console.log(JSON.stringify(user));
		
		axios.post('http://localhost:5000/users/login', user, { withCredentials: true })
			.then((res) => {
				console.log("Login response:")
				console.log(res.data);
				if (res.status === 200) {
					console.log("Res status is 200")
					props.setIsAuth(true);
					props.history.push('/viewProducts');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className="login" style={styles.signUp}>
			<h1 style={styles.h1}>Log In</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control 
						required 
						type="text" 
						placeholder="Enter username" 
						onChange={(e) => setUsername(e.target.value)}/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control 
						required 
						type="password" 
						placeholder="Enter password"
						onChange={(e) => setPassword(e.target.value)} />
				</Form.Group>

				<Button 
					className="float-right" 
					variant="primary" 
					type="submit">
					Login
				</Button>
			</Form>
		</div>
	)
}

const styles = {
	signUp: {
		width: "33%",
		padding: "1.5em",
		borderRadius: "10%",
		backgroundColor: "rgba(255, 255, 255, 0.815)",
		margin: "auto"
	},
	h1: {
		fontSize: "24px",
	}
};

export default Login;