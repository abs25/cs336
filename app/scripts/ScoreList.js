import React from 'react';
import styles from '../css/style.css';
import Score from './Score';

module.exports = React.createClass({
  render: function() {
    var scoreNodes = this.props.data.map(function(score) {
      return (
        <Score scoreValue = {score.score} name={score.name}  date={score.date} difficulty={score.difficulty} key={score.id}/>
      );
    });
    // TODO: Rank is not yet implemented
    return (
      <div className={styles.scoreList}>
          <span className={styles.scoreValue}>Score</span>
          <span className={styles.scoreName}>Name</span>
          <span className={styles.scoreDate}>Date</span>
          <div className = {styles.scoreNodes}>
            {scoreNodes}
          </div>
      </div>
    );
  }
});
