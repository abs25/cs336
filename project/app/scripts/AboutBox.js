import React from 'react';
import styles from '../css/style.sty.css';

module.exports = React.createClass({
  render: function() {
    return (
      //http://javascriptplayground.com/blog/2016/07/css-modules-webpack-react/

      <div className={styles.aboutBox}>
        <h2>About Jedi Trainer</h2>
        <p>Ten years ago, Calvin Student Josh Holtrop pulled a rabbit out of his hat and created the amazing project that became known as the Jedi Trainer. It used magnetic tracking and a headset to create a virtual reality of a scene in Star Wars. The Jedi Trainer became a staple of Calvin's Computer Science department and was showcased to prospective Calvin students. Unfortunately, the Jedi Trainer deteriorated through years of use, and everything broke.</p>
        <p>It has been an annual goal of the department to make the game functional again, but the project was too overwhelming for students to complete. Now, new VR Software like SteamVR for the HTC Vive can interface with modern game engines, making it increasingly easy to build virtual reality (VR) applications. We were intrigued at the idea of VR and creating a game that could be showcased to future computer scientists, and decided to look closer at the problems associated with this project. After tinkering with the old magnetic tracking system, we decided that it would be more sensible to start the project from scratch, utilizing new technologies that have arrived since the original Jedi Trainer was created.</p>
      </div>

    );
  }
});
