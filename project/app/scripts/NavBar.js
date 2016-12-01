import React from 'react';
import styles from '../css/style.css';

//this is the navigation bar
module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.navBar}>
        <h2>NavBar</h2>
      </div>
    );
  }
});
