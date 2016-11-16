import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

module.exports = React.createClass({
	render: function() {
		return (
			<div className="person">
			<h2 className="personInfo">
			{this.props.personId} {/*access the personID of an element passed to Person component*/}
			{this.props.firstName} {/*space*/}
			{this.props.lastName} {}
			{this.props.years}
			</h2>
			</div>
		);
	}
});
