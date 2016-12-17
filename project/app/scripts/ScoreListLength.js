import React from 'react';
import styles from '../css/style.sty.css';
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
  handleTwentyFive: function(){
    this.handleLengthFilterChange(25);
  },
  handleLengthFilterChange: function(lengthFilter) {
    this.setState({lengthFilter: lengthFilter});
    this.props.onLengthFilterSubmit(lengthFilter);
  },
  render: function() {
    return (
      <div className={styles.scoreListLength}>
        <h3><a onClick={this.handleTen}>10</a> - <a onClick={this.handleTwentyFive}>25</a> - <a onClick={this.handleFifty}>50</a> </h3>

      </div>
    );
  }
});
