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
      <div className={styles.scoreListLength}>
        <h3><a onClick={this.handleTen}>10</a> - <a onClick={this.handleFifty}>50</a> - <a onClick={this.handleOneHundred}>100</a> </h3>
      </div>
    );
  }
});
