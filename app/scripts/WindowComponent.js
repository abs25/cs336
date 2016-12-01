import React from 'react';

import AboutBox from './AboutBox';

import '../css/style.css';

//WindowComponent
module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello World</h1>
        {this.props.children}
        <AboutBox />
      </div>

    );
  }
});
