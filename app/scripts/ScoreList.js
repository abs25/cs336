import React from 'react';
import styles from '../css/style.css';
import Score from './Score';

module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.scoreList}>
        <h3>Rank - Name - Score - Date</h3>
        <Score />
      </div>
    );
  }
});
