import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';
//import '../css/base.css';

import PersonBox from './personBox.js';
import Person from './person.js';
ReactDOM.render(
	<PersonBox url="/api/people" pollInterval={2000}/>,
	document.getElementById('content')
);
