import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import PersonList from './personList.js';
import PersonForm from './personForm.js';
module.exports = React.createClass({
	loadPeopleFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(people) {
				this.setState({people: people});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handlePersonSubmit: function(person) {
		var people = this.state.people;
		var newPeople = people.concat([person]);
		this.setState({people: newPeople});
		//submit to server and refresh list
		$.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: person,
      success: function(people) {
        this.setState({people: people});
      }.bind(this),
      error: function(xhr, status, err) {
				this.setState({people: person});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},
	getInitialState: function() {
		return {people: []};
	},
	componentDidMount: function() {
		this.loadPeopleFromServer();
		setInterval(this.loadPeopleFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<div className="personBox">
			<h1>People</h1>
			<PersonList people = {this.state.people} />
			<PersonForm onPersonSubmit={this.handlePersonSubmit} />
			</div>
		);
	}
});
