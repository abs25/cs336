import React from 'react';
import styles from '../css/style.css';
import ScoreSearch from './ScoreSearch';
import ScoreFilter from './ScoreFilter';
import ScoreList from './ScoreList';
import ScoreListLength from './ScoreListLength';

import $ from 'jquery';
var cols = [
  {key: 'score', label: 'Score'},
  {key: 'name', label: 'Name'},
  {key: 'date', label: 'Date'}
];
module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadScoresFromServer();
    setInterval(this.loadScoresFromServer, 2000); // TODO: Extract hard coded constant
  },
  loadScoresFromServer: function(){
    $.ajax({
      url: "/scores/", // TODO: Extract hard coded URL
      dataType: 'json',
      cache: false,
      data: {searchFilter: this.state.searchFilter, sortFilter: this.state.sortFilter, lengthFilter: this.state.lengthFilter},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/scores/", status, err.toString());
      }.bind(this)
    });
  },
  handleSearchSubmit: function(searchFilter) {
    this.setState({searchFilter: searchFilter});
    this.loadScoresFromServer();
  },
  handleSortFilterSubmit: function(sortFilter) {
    this.setState({sortFilter: sortFilter});
    this.setState({searchFilter: ''});
    this.loadScoresFromServer();
  },

  handleLengthFilterSubmit: function(lengthFilter) {
    this.setState({lengthFilter: lengthFilter});
    this.setState({searchFilter: ''});
    this.loadScoresFromServer();
  },

  render: function() {
    return (
      <div className={styles.scoreBox}>
        <h2>Leaderboard</h2>
        <div className={styles.scoreFlexContainer} >
          <ScoreSearch onSearchFilterSubmit={this.handleSearchSubmit}/>
          <ScoreFilter onSortFilterSubmit={this.handleSortFilterSubmit}/>
        </div>
        <ScoreList cols={cols} data={this.state.data} />
        <ScoreListLength onLengthFilterSubmit={this.handleLengthFilterSubmit}/>
      </div>
    );
  }
});
