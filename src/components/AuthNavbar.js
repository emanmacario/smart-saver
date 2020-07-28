import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function AuthNavbar({ setIsAuth }) {

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
        console.log("User logged out successfully");
        setIsAuth(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  return (
    <nav style={styles.navBackground} className="navbar navbar-expand-sm fixed-top navbar-dark shadow">
      <Link style={styles.navBrand} className="navbar-brand ml-2" to='/'>Smart Saver</Link>
      <ul class="navbar-nav ml-auto mr-4">
        <li class="nav-item ">
          <button style={styles.navLogout} type="button" className="btn" onClick={logout}>
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  )
}

const styles = {
  navBackground: {
    backgroundColor: '#089cec'
  },
  navBrand: { 
    fontSize: '1.5em', fontFamily: "'Noto Sans KR', sans-serif" 
  },
  navLogout: { 
    fontSize: '1.2em', 
    color: '#FFF',
    marginBottom: 0,
    outline: 0
  },
}

export default AuthNavbar;