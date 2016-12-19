import React from 'react';
import styles from '../css/style.css';
module.exports = React.createClass({
      // TODO: Add other score fields
  render: function() {
    return (
      <div className={styles.score}>
        {this.props.score}
        {this.props.name}
        {this.props.date}
      </div>
    );
  }
});
