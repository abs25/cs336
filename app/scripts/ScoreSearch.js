import React from 'react';
import styles from '../css/style.sty.css';
module.exports = React.createClass({
  getInitialState: function() {
    return {searchFilter: ''};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var searchFilter = this.state.searchFilter.trim();
    this.props.onSearchFilterSubmit(searchFilter);
  },
  handleSearchFilterChange: function(e) {
    this.setState({searchFilter: e.target.value});
  },
  render: function() {
    return (
      <div className={styles.scoreSearch}>
      <form className="scoreSearchForm" onSubmit={this.handleSubmit}>
      <input
        type="text"
        value={this.state.searchFilter}
        onChange={this.handleSearchFilterChange}
      />
        <input type="submit" value="Search" />
      </form>
      </div>
    );
  }
});
