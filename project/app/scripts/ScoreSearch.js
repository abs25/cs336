import React from 'react';
import styles from '../css/style.css';
module.exports = React.createClass({
  getInitialState: function() {
    return {searchFilter: ''};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var searchFilter = this.state.searchFilter.trim();
    if (!searchFilter) {
      return;
    }
    this.props.onSearchFilterSubmit(searchFilter);
    this.setState({searchFilter: ''});
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
        placeholder="Search"
        value={this.state.searchFilter}
        onChange={this.handleSearchFilterChange}
      />
        <input type="submit" value="Search" />
      </form>
      </div>
    );
  }
});
