import React from 'react';
import styles from '../css/style.sty.css';

module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.mediaBox}>
        <h2>Media</h2>
        <h3>Video</h3>
        <iframe width="280" height="157" src="https://www.youtube.com/embed/8BpGmXSRCC4" frameborder="0" allowfullscreen></iframe>
        <h3>Screenshots</h3>
      </div>
    );
  }
});
