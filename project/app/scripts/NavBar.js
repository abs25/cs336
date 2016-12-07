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
          <IndexLink to="/" activeClassName={styles.active}><li>Home</li></IndexLink>
          <Link to="/about" activeClassName={styles.active}><li>About</li></Link>
          <Link to="/leaderboard" activeClassName={styles.active}><li>Leaderboard</li></Link>
          <Link to="/media" activeClassName={styles.active}><li>Media</li></Link>
        </ul>
      </div>
    );
  }
});
