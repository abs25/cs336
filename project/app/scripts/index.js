import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import '../css/style.css';

import WindowComponent from './WindowComponent';

//render ALL the things
ReactDOM.render(
  <WindowComponent />,
  document.getElementById('content')
);
