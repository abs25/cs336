import React from 'react';

import styles from '../css/style.css';

module.exports = React.createClass({
  render: function() {
    return (
      //http://javascriptplayground.com/blog/2016/07/css-modules-webpack-react/
      <div className={styles.aboutBox}>
        <h2>About Jedi Trainer</h2>
        {this.props.children}
        <p>text</p>
      </div>
    );
  }
});
