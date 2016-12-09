import React from 'react';
import styles from '../css/style.css';
module.exports = React.createClass({
      // TODO: Add other score fields
  render: function() {
    return (
      <div className={styles.score}>
        <span className={styles.scoreValue}>{this.props.scoreValue}</span>
        <span className={styles.scoreName}>{this.props.name}</span>
        <span className={styles.scoreDate}>{this.props.date}</span>
      </div>
    );
  }
});
