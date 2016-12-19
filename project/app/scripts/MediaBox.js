import React from 'react';
import ReactPlayer from 'react-player';
import styles from '../css/style.css';

module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.mediaBox}>
        <h2>Media</h2>
        <h3>Video</h3>
        <div className={styles.videoWrapper}><ReactPlayer width={250} height={200} controls className={styles.responsiveVideo} url="https://youtu.be/8BpGmXSRCC4" /></div>
        <h3>Screenshots</h3>
        <img src={require('../img/Capture.png')} className={styles.responsiveImg} />
        <img src={require('../img/Capture2.png')} className={styles.responsiveImg} />
        <img src={require('../img/Capture3.png')} className={styles.responsiveImg} />
      </div>
    );
  }
});
