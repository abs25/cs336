import React from 'react';
import styles from '../css/style.css';
import { Link, IndexLink } from 'react-router'

//this is the navigation bar
module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.navBar}>
        {/* Create a list of links that correspond with the paths defined in index.js */}
        <ul role="nav">
          {/* style={{ textDecoration: 'none' }} gits rid of the stupid underline on the link. I couldn't figure out a way to do that in the css */}
          <IndexLink to="/" style={{ textDecoration: 'none' }} activeClassName={styles.active}><li>Home</li></IndexLink>
          <Link to="/about" style={{ textDecoration: 'none' }} activeClassName={styles.active}><li>About</li></Link>
          <Link to="/leaderboard" style={{ textDecoration: 'none' }} activeClassName={styles.active}><li>Leaderboard</li></Link>
          <Link to="/media" style={{ textDecoration: 'none' }} activeClassName={styles.active}><li>Media</li></Link>
        </ul>
      </div>
    );
  }
});
