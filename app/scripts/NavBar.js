import React from 'react';
import styles from '../css/style.css';
import { Link, IndexLink } from 'react-router'

//this is the navigation bar
module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.navBar}>
        <h2>NavBar</h2>
        {/* Create a list of links that correspond with the paths defined in index.js */}
        <ul role="nav">
          <li><IndexLink to="/" activeClassName={styles.active}>Home</IndexLink></li>
          <li><Link to="/about" activeClassName={styles.active}>About</Link></li>
          <li><Link to="/leaderboard" activeClassName={styles.active}>Leaderboard</Link></li>
          <li><Link to="/media" activeClassName={styles.active}>Media</Link></li>
        </ul>
      </div>
    );
  }
});
