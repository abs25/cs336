import React from 'react';
import '../css/style.css';

import ScoreSearch from './ScoreSearch';
import ScoreFilter from './ScoreFilter';
import ScoreList from './ScoreList';
import ScoreListLength from './ScoreListLength';

module.exports = React.createClass({
  render: function() {
    return (
      <div className="scoreBox">
        <h2>ScoreBox</h2>
        <ScoreSearch />
        <ScoreFilter />
        <ScoreList />
        <ScoreListLength />
      </div>
    );
  }
});
