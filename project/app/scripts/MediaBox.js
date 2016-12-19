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
        <h4>Our current project running on the Unreal engine</h4>
        <img src={require('../img/Unreal.png')} className={styles.responsiveImg} />
        <h4>An early WIP Jedi Trainer running on the Unity engine</h4>
        <img src={require('../img/Unity.png')} className={styles.responsiveImg} />
        <h4>Examples of blueprint code in Unreal</h4>
        <img src={require('../img/CodeSnip1.png')} className={styles.responsiveImg} />
        <img src={require('../img/CodeSnip2.png')} className={styles.responsiveImg} />
        <img src={require('../img/CodeSnip3.png')} className={styles.responsiveImg} />
      </div>
    );
  }
});
