import React from 'react';

import NavBar from './NavBar';
import AboutBox from './AboutBox';
import ScoreBox from './ScoreBox';
import MediaBox from './MediaBox';
import '../css/style.css';

//WindowComponent
module.exports = React.createClass({
  render: function() {
    return (
      <div className="windowComponent">
        <h1>Hello World</h1>
        <NavBar />
        <ScoreBox />
        <AboutBox />
        <MediaBox />
      </div>

    );
  }
});
