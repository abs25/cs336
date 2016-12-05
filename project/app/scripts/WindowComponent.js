import React from 'react';

import NavBar from './NavBar';
import AboutBox from './AboutBox';
import ScoreBox from './ScoreBox';
import MediaBox from './MediaBox';
import styles from '../css/style.css';

//WindowComponent
module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.windowComponent}>
        <NavBar />
        <ScoreBox />
        <AboutBox />
        <MediaBox />
      </div>

    );
  }
});
