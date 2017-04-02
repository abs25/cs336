import React from 'react';
import styles from '../css/style.css';
module.exports = React.createClass({
  getInitialState: function() {
    return {sortFilter: ''};
  },
  handleTop: function(){
    this.handleSortFilterChange("Top");
  },
  handleNew: function(){
    this.handleSortFilterChange("New");
  },
  handleBestRecent: function(){
    this.handleSortFilterChange("Month");
  },
  handleSortFilterChange: function(sortFilter) {
    this.setState({sortFilter: sortFilter});
    this.props.onSortFilterSubmit(sortFilter);
  },
  render: function() {
    return (
      <div className={styles.scoreFilter}>
        <h3><button onClick={this.handleTop}>Top</button> - <button onClick={this.handleNew}>New</button> - <button onClick={this.handleBestRecent}>Best Recent</button> </h3>
      </div>
    );
  }
});
