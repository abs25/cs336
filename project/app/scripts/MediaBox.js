import React from 'react';
import ReactPlayer from 'react-player';
import styles from '../css/style.css';

module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.mediaBox}>
        <h2>Media</h2>
        <h3>Video</h3>
        <ReactPlayer controls className={styles.responsiveVideo} url="https://youtu.be/8BpGmXSRCC4" />
        <h3>Screenshots</h3>
        <div><img src={require('../img/Capture.png')} className={styles.responsiveImg} /></div>
        <div><img src={require('../img/Capture2.png')} className={styles.responsiveImg} /></div>
        <div><img src={require('../img/Capture3.png')} className={styles.responsiveImg} /></div>
      </div>
    );
  }
});
