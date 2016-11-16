import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

module.exports = React.createClass({
	getInitialState: function() {
		return {personId: '', firstName: '', lastName: '', years: ''};
	},
	handlePersonIdChange: function(e) {
		this.setState({personId: e.target.value});
	},
	handleFirstNameChange: function(e) {
		this.setState({firstName: e.target.value});
	},
	handleLastNameChange: function(e) {
		this.setState({lastName: e.target.value});
	},
	handleYearsChange: function(e) {
		this.setState({years: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var personId = this.state.personId.trim();
		var firstName = this.state.firstName.trim();
		var lastName = this.state.lastName.trim();
		var years = this.state.years.trim();
		if(!personId || !firstName || !lastName || !years) {
			return;
		}
		this.props.onPersonSubmit({personId: personId, firstName: firstName, lastName: lastName, years: years})
		this.setState({personId: '', firstName: '', lastName: '', years: ''});
	},
	render: function() {
		return (
			<form className="peopleForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="ID:" value={this.state.personId} onChange={this.handlePersonIdChange} /> {}
				<input type="text" placeholder="First Name:" value={this.state.firstName} onChange={this.handleFirstNameChange} /> {}
				<input type="text" placeholder="Last Name:" value={this.state.lastName} onChange={this.handleLastNameChange}/> {}
				<input type="text" placeholder="Years:" value={this.state.years} onChange={this.handleYearsChange}/> {}
				<input type="submit" value="Add Person" />
			</form>
		);
	}
});
