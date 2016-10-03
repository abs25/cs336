/**
* This server stores and returns people records.
* @author abs25
*/

var express = require('express');
var app = express();

/////////////////////////////////////////////
//server code//
app.get('/people', function (req, res) {
  res.json(people);

});

app.get('/people/:id', function (req, res) {
  res.json(getById(req.params.id)); //call the getById function, which returns the person object with the specified ID
});

app.get('/people/:id/name', function (req, res) {
	res.json(getNameById(req.params.id)); //call the getNameById function which gets the name for a specified ID
});

app.get('/people/:id/years', function (req, res) {
  res.json(getYearsById(req.params.id)); //call the getYearsById function which gets the senority (in years) for a specified ID
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});
/////////////////////////////////////////////


// An array of person objects
var people = [ 
	{id: 0, firstName: "Chris", lastName: "Dilley", years: 4},
	{id: 1, firstName: "Derek", lastName: "Dik", years: 4},
	{id: 2, firstName: "Stephen", lastName: "Curry", years: 8},
	{id: 3, firstName: "Justin", lastName: "Verlander", years: 10},
	{id: 4, firstName: "Matthew", lastName: "Stafford", years: 8},
	{id: 5, firstName: "Michael", lastName: "Fulmer", years: 1}
];

/** getById() returns the person object with the specified ID
*	@param id, the ID number of the person
*	
*	@return the person object
*/
function getById(id){
	//filter through the list of person objects
	return people.filter(function(obj) {
		//if the object ID is the same as the given ID, return that object.
		if(obj.id == id) {
			return obj;
		}
	})[0]; //filter returns a list so this is the first (and only) item in that list
}

/** getNameById() returns the full name of the person with that ID 
*	@param id, the ID of the person
*	
*	@return the full name of the person
*/
function getNameById(id){
	var record = getById(id); //get the person object at that ID
	return record.firstName + " " + record.lastName; //return the first and last name from that person object
}

/** getYearsById() returns the seniority (in years) of the person with that ID 
*	@param id, the ID of the person
*	
*	@return the senority (in years) of the person
*/
function getYearsById(id){
	var record = getById(id); //get the person object at that ID
	return record.years; //return the first and last name from that person object
}
