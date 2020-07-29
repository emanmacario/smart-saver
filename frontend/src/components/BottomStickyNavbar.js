import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function BottomStickyNavbar() {

  return (
    <div className="mt-auto" role="navigation">
      <div className="navbar sticky-bottom navbar-dark bg-dark">
        <p className="ml-auto navbar-brand mb-0">Made by Emmanuel Macario</p>
        <a style={{ color: 'inherit' }} href="https://github.com/emanmacario/smart-saver/" target='_blank' rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      </div>
    </div>
  )
}

export default BottomStickyNavbar;