import React from 'react';
import '../css/style.css';
import Score from './Score';

module.exports = React.createClass({
  render: function() {
    return (
      <div className="scoreList">
        <h3>Rank - Name - Score - Date</h3>
        <Score />
      </div>
    );
  }
});
