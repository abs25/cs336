import React from 'react';
import styles from '../css/style.css';
import ScoreSearch from './ScoreSearch';
import ScoreFilter from './ScoreFilter';
import ScoreList from './ScoreList';
import ScoreListLength from './ScoreListLength';

module.exports = React.createClass({
  handleSearchSubmit: function(searchFilter) {
    // TODO: Refresh the list of scores
    console.log("Searched with filter: " + searchFilter);
  },
  render: function() {
    return (
      <div className={styles.scoreBox}>
        <h2>ScoreBox</h2>
        <ScoreSearch onSearchFilterSubmit={this.handleSearchSubmit}/>
        <ScoreFilter />
        <ScoreList />
        <ScoreListLength />
      </div>
    );
  }
});
