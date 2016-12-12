import React from 'react';
import styles from '../css/style.css';
import { Link, IndexLink } from 'react-router'

//this is the navigation bar
module.exports = React.createClass({

  //In order to have a second, hidden div, i think we need to have it hidden until the route is active, then change the state. Something similar to this: http://stackoverflow.com/questions/24502898/show-or-hide-element-in-react-js maybe?*/
  //I'd rather not use jQuery if we can just do it in react. But CSS doesn't have if statements :( */)

  //or, maybe do something like: if route is active, change aboutBox class to aboutBoxActive class? */
  render: function() {
    return (
      <div className={styles.navBar}>
        {/* Create a list of links that correspond with the paths defined in index.js */}
        <ul role="nav">
          {/* style={{ textDecoration: 'none' }} gits rid of the stupid underline on the link. I couldn't figure out a way to do that in the css */}
          <IndexLink to="/" style={{ textDecoration: 'none' }} activeClassName={styles.indexActive}><li>Home</li></IndexLink>
          <Link to="/about" style={{ textDecoration: 'none' }} activeClassName={styles.aboutActive}><li>About</li></Link>
          <Link to="/leaderboard" style={{ textDecoration: 'none' }} activeClassName={styles.scoresActive}><li>Leaderboard</li></Link>
          <Link to="/media" style={{ textDecoration: 'none' }} activeClassName={styles.mediaActive}><li>Media</li></Link>
        </ul>
      </div>
    );
  }
});
