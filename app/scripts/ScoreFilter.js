import React from 'react';
import styles from '../css/style.css';
module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.aboutBox}>
        <h3>Top - New - Last 10</h3>
      </div>
    );
  }
});
