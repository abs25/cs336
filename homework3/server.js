/**
* This server stores and returns people records.
* @author abs25
*/

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var HttpStatus = require('http-status-codes');
var bodyParser = require('body-parser');

app.use('/', express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var PEOPLE_FILE = path.join(__dirname, 'people.json');
/////////////////////////////////////////////
//server code//

//////////////////temporary/////////////////////////
app.get('/api/people', function(req, res) {
  fs.readFile(PEOPLE_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/people', function(req, res) {
  fs.readFile(PEOPLE_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var people = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newPerson = {
      personId: req.body.personId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      years: req.body.years
    };
    people.push(newPerson);
    fs.writeFile(PEOPLE_FILE, JSON.stringify(people, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(people);
    });
  });
});
//////////////////end temporary//////////////////////

app.get('/people', function (req, res) {
  res.json(people);
});

app.get('/person/:id', function (req, res) {
  res.json(getById(req.params.id)); //call the getById function, which returns the person object with the specified ID
});

app.delete('/person/:id', function(req, res) {
  removeById(req.params.id);
  res.send('Person ' + req.params.id + " removed!");

});

app.get('/person/:id/name', function (req, res) {
	res.json(getNameById(req.params.id)); //call the getNameById function which gets the name for a specified ID
});

app.get('/person/:id/years', function (req, res) {
  res.json(getYearsById(req.params.id)); //call the getYearsById function which gets the senority (in years) for a specified ID
});

app.get("/fetchPerson", function(req, res) {
    var person = getById(req.query.user_id);
    res.send(person);
});

app.post('/people', function (req, res) {
  addPerson(req.body.user_id, req.body.user_first_name, req.body.user_last_name, req.body.user_years);
  console.log("Person added");
});

//send 404 if any other path
app.get("*", function (req, res) {
	res.sendStatus(404);
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

function addPerson(id_num, first, last, year) {
  people.push({id: id_num, firstName: first, lastName: last, years: year});
}
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

//this function removes a person with a given ID.
//adapted from http://stackoverflow.com/questions/21659888/javascript-find-and-remove-object-in-array-based-on-key-value
function removeById(id) {
  for(var i = 0; i < people.length; i++) {
      if(people[i].id == id) {
          people.splice(i, 1);
          break;
      }
  }
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
