import React from 'react'
import styles from '../css/style.sty.css'

import AboutBox from './AboutBox';
import ScoreBox from './ScoreBox';
import MediaBox from './MediaBox';

module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.home}>
        <AboutBox />
        <ScoreBox />
        <MediaBox />
      </div>
    )
  }
})
