import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Button, Form, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ViewProducts from './components/ViewProducts';


function App(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    console.log(`User authenticated: ${isAuth}`);

    axios.get('http://localhost:5000/users/', { 
      withCredentials: true 
    })
    .then((res) => {
      console.log("GET /users/ response: ")
      console.log(res.data);
      if (res.data.user) {
        console.log("User session found");
        setIsAuth(true);
        setUsername(res.data.user.username);
      } else {
        console.log("User session not found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  });
  
  const logout = (event) => {
    event.preventDefault();
    console.log("Logging out");
    axios.get('http://localhost:5000/users/logout/', { 
      withCredentials: true 
    })
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
      <Navbar style={styles.nav} className="fixed-top border-bottom shadow" variant="dark" expand="lg">
        <Navbar.Brand className="mx-2" as={Link} to="/">Smart Saver</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          { isAuth ? (
              <Nav className="mr-auto">
                <Nav.Link className="mx-2" as={Link} to="/viewProducts">Products</Nav.Link>
                <Form inline>
                  <Button className="ml-auto" variant="outline-light" onClick={logout}>Logout</Button>
                </Form>
              </Nav>
              
          ) : (
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/signup">Create Account</Nav.Link>
                <Nav.Link className="mx-5" as={Link} to="/login">Log In</Nav.Link>
              </Nav>
            )
          }
        </Navbar.Collapse>
      </Navbar>

      <Route path="/" exact component={Home} />
      <Route path="/signup" exact render={() => (
                isAuth ? (
                    <Redirect to="/viewProducts" />
                ) : (
                    <SignUp />
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
  },
  nav: {
    backgroundColor: '#089cec',
    boxShadow: '0 2px 2px -2px rgba(0,0,0,.2)'
  }
}

export default App;