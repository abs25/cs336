import React from 'react';
import styles from '../css/style.sty.css';
import Score from './Score';

{/* Most of the table code is from http://jsfiddle.net/jhudson8/dahdx6eu/ */}

module.exports = React.createClass({
  render: function() {
    var headerComponents = this.generateHeaders(),
        rowComponents = this.generateRows();

    return (
      <table>
      <thead><tr>{headerComponents}</tr></thead>
      <tbody>{rowComponents}</tbody>
      </table>
    );
  },

  generateHeaders: function() {
      var cols = this.props.cols;  // [{key, label}]

      // generate our header (th) cell components
      return cols.map(function(colData) {
          return <th key={colData.key}> {colData.label}</th>;
    });
  },

  generateRows: function() {
    var cols = this.props.cols,  // [{key, label}]
    data = this.props.data;

    return data.map(function(item){
      // handle the column data within each row
      var cells = cols.map(function(colData) {

        return <td>{item[colData.key]}</td>;
      });
      return <tr key={item.id}>{cells}</tr>;
    });
  }

  // render: function() {
  //   var scoreNodes = this.props.data.map(function(score) {
  //     return (
  //       <Score scoreValue = {score.score} name={score.name}  date={score.date} difficulty={score.difficulty} key={score.id}/>
  //     );
  //   });
  //   // TODO: Rank is not yet implemented
  //   return (
  //     <div className={styles.scoreList}>
  //       <table>
  //       <thead>
  //         <tr>
  //           <th>Score</th>
  //           <th>Name</th>
  //           <th>Date</th>
  //         </tr>
  //       </thead>
  //
  //       <tbody>
  //         {scoreNodes}
  //       </tbody>
  //       </table>
  //     </div>
  //   );
  //}
});
