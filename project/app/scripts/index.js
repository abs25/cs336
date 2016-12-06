import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import { Router, Route, Redirect, hashHistory, IndexRoute } from 'react-router';
import $ from 'jquery';

import styles from '../css/style.css';

import WindowComponent from './WindowComponent';
import AboutBox from './AboutBox';
import ScoreBox from './ScoreBox';
import MediaBox from './MediaBox';
import NavBar from './NavBar'
import Home from './Home'

//render ALL the things
ReactDOM.render((
  <Router history={hashHistory}>
  {/*these are the paths to the different boxes*/}
    <Route path="/" component={WindowComponent} >
       {/* make them children of WindowComponent */}
      <IndexRoute component={Home} />
      <Route path="/about" component={AboutBox} />
      <Route path="/scores" component={ScoreBox} />
      <Route path="/media" component={MediaBox} />
    </Route>
  </Router>
),

  document.getElementById('content')
);
