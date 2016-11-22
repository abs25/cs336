import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import CommentList from './commentList.js';
import CommentForm from './commentForm.js';
import { API_URL, POLL_INTERVAL } from './global';

//CommentBox
module.exports = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: API_URL,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(API_URL, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
   var comments = this.state.data;
   comment.id = Date.now();
   var newComments = comments.concat([comment]);
   this.setState({data: newComments});
    $.ajax({
      url: API_URL,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(API_URL, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, POLL_INTERVAL)
  },
  render: function() {
    return (
      <div className="commentBox">
      <h1>Comments</h1>
      <CommentList data={this.state.data}/>
      <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
