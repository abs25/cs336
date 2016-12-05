import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import styles from '../css/style.css';

import WindowComponent from './WindowComponent';

//render ALL the things
ReactDOM.render(
  <WindowComponent />,
  document.getElementById('content')
);
