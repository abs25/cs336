import React from 'react';

import NavBar from './NavBar';

import styles from '../css/style.sty.css';

//WindowComponent
module.exports = React.createClass({
  render: function() {
    return (
      <div className={styles.windowComponent}>
          <NavBar />
          {/* this renders the children of the links in the navbar... see index.js */}
          {this.props.children}

      </div>

    );
  }
});
