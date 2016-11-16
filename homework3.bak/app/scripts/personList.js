import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import Person from './person.js';

module.exports = React.createClass({
	render: function() {
		var personNodes = this.props.people.map(function(person) {
			return (
				<Person personId = {person.personId} firstName = {person.firstName} lastName = {person.lastName} years = {person.years} key={person.personId}>
				</Person>
			);
		});
		return (
			<div className="personList">
			{personNodes}
			</div>
		);
	}
});
