import React from 'react';
import { Link } from 'react-router-dom';

function UnauthNavbar() {

  return (
    <nav style={styles.navBackground} className="navbar navbar-expand-sm fixed-top navbar-dark shadow">
      <Link style={styles.navBrand} className="navbar-brand ml-2" to='/'>Smart Saver</Link>
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <Link style={styles.navLink} className="nav-link" to='/login'>Log In</Link>
        </li>
        <li className="nav-item mr-2">
          <Link style={styles.navLink} className="nav-link" to='/signup'>Sign Up</Link>
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
  navLink: { 
    fontSize: '1.2em', color: '#FFF' 
  }
}

export default UnauthNavbar;