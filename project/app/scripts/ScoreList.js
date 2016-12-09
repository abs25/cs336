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
        <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          {/*can we get each value of scoreNodes separately?*/}
            <td>{scoreNodes}</td>
          </tr>
        </tbody>
        </table>
      </div>
    );
  }
});
