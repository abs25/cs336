import React from 'react';
import styles from '../css/style.css';
module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.score}>
        <ol>
          <li>This is a score</li>
        </ol>
      </div>
    );
  }
});
