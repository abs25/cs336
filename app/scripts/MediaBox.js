import React from 'react';
import ReactPlayer from 'react-player';
import styles from '../css/style.css';

module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.mediaBox}>
        <h2>Media</h2>
        <div className={styles.images}>
        <h3>Screenshots</h3>
          <div className={styles.unrealImages}>
            <h5>Our current project running on the Unreal engine</h5>
            <img src={require('../img/Unreal.png')} className={styles.responsiveImg} />
          </div>
          <div className={styles.unityImages}>
            <h5>An early WIP Jedi Trainer running on the Unity engine</h5>
            <img src={require('../img/Unity.png')} className={styles.responsiveImg} />
          </div>
          <div className={styles.codeImages}>
            <h5>Examples of blueprint code in Unreal</h5>
            <img src={require('../img/CodeSnip1.png')} className={styles.responsiveImg} />
            <img src={require('../img/CodeSnip2.png')} className={styles.responsiveImg} />
            <img src={require('../img/CodeSnip3.png')} className={styles.responsiveImg} />
          </div>
        </div>
        <div className={styles.video}>
          <h3>Video</h3>
          <ReactPlayer width={280} height={174} controls className={styles.responsiveVideo} url="https://youtu.be/8BpGmXSRCC4" />
        </div>

      </div>
    );
  }
});
