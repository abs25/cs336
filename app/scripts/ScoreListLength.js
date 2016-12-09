import React from 'react';
import styles from '../css/style.css';

module.exports = React.createClass({
  getInitialState: function() {
    return {lengthFilter: 10};
  },
  handleTen: function(){
    this.handleLengthFilterChange(10);
  },
  handleFifty: function(){
    this.handleLengthFilterChange(50);
  },
  handleOneHundred: function(){
    this.handleLengthFilterChange(100);
  },
  handleLengthFilterChange: function(lengthFilter) {
    this.setState({lengthFilter: lengthFilter});
    this.props.onLengthFilterSubmit(lengthFilter);
  },
  render: function() {
    return (
      <div className={styles.aboutBox}>
        <h3><button onClick={this.handleTen}>10</button> - <button onClick={this.handleFifty}>50</button> - <button onClick={this.handleOneHundred}>100</button> </h3>
      </div>
    );
  }
});
