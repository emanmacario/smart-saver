import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Home() {

  return (
    <div className="container-fluid d-flex flex-column px-0">

      <div className="px-0 py-5 mt-0 mb-5 text-center">
        <h1 style={styles.brandName} className="py-5">Smart Saver</h1>
        <h5 style={styles.brandDescription} className="text-muted my-5 col-md-6 mx-auto">
          Automatic notification of specials on your favourite Woolworths products
        </h5>
      </div>

      <hr className="my-0" />
      <div className="bg-light mb-0 py-4">
        <h2 className="my-5 text-center">How it works - three simple steps</h2>
        <div className="container pb-4">
          <div className="row pb-4">
            <div className="col-md-4">
              <div className="my-4">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </div>
              <h4>Create an account</h4>
              <p className="text-muted">
                Quickly sign up with an email address and password
              </p>
            </div>
            <div className="col-md-4">
              <div className="my-4">
                <FontAwesomeIcon icon={faShoppingBasket} size="2x" />
              </div>
              <h4>Add your products</h4>
              <p className="text-muted">
                Add your favourite Woolworths products by entering their URLs
              </p>
            </div>
            <div className="col-md-4">
              <div className="my-4">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </div>
              <h4>Receive notifications</h4>
              <p className="text-muted">
                Be automatically notified via email as soon as one of your products goes on special
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-0" />
      
      <div className="mb-4 text-center">
        <h2 className="my-5">Disclaimer</h2>
        <h5 className="text-muted my-5">
          This website uses the Woolworths API but is not affiliated with, endorsed or certified by Woolworths
        </h5>
      </div>
 
      <div className="mt-auto" role="navigation">
        <div className="navbar sticky-bottom navbar-dark bg-dark">
          <p className="ml-auto navbar-brand mb-0">Made by Emmanuel Macario</p>
          <a style={{ color: 'inherit' }} href="https://github.com/emanmacario/smart-saver/">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>
      </div>
    </div>
  )
}

const styles = {
  brandContainer: {
    backgroundColor: '#089cec',
    color: '#ffffff',
  },

  brandName: {
    fontFamily: "'Noto Sans JP', sans-serif",
    fontSize: '64px',
    color: '#fea93c'
  },

  brandDescription: {
    fontSize: '32px'
  }
}

export default Home;