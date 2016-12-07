import React from 'react';
import styles from '../css/style.css';
import Score from './Score';

module.exports = React.createClass({
  render: function() {
    var scoreNodes = this.props.data.map(function(score) {
      return (
        <Score name={score.name} scoreValue = {score.score} date={score.date} difficulty={score.difficulty} key={score.id}/>
      );
    });
    // TODO: Rank is not yet implemented
    return (
      <div className={styles.scoreList}>
        <h3>Name - Score - Date</h3>
        {scoreNodes}
      </div>
    );
  }
});
