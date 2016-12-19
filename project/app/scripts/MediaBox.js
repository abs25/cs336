import React from 'react';
import styles from '../css/style.css';

module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.mediaBox}>
        <h2>Media</h2>
        <h3>Video</h3>
        <iframe className={styles.responsiveVideo} src="https://www.youtube.com/embed/8BpGmXSRCC4" frameborder="0" allowfullscreen></iframe>
        <h3>Screenshots</h3>
        <div><img src={require('../img/Capture.png')} className={styles.responsiveImg} /></div>
        <div><img src={require('../img/Capture2.png')} className={styles.responsiveImg} /></div>
        <div><img src={require('../img/Capture3.png')} className={styles.responsiveImg} /></div>
      </div>
    );
  }
});
