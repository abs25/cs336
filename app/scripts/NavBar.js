import React from 'react';
import styles from '../css/style.css';
import { Link } from 'react-router'

//this is the navigation bar
module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.navBar}>
        <h2>NavBar</h2>
        {/* Create a list of links that correspond with the paths defined in index.js */}
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/scores">Scores</Link></li>
          <li><Link to="/media">Media</Link></li>
        </ul>
      </div>
    );
  }
});
