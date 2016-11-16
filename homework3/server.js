/**
* This server stores and returns people records.
* @author abs25
*/

var db;
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var HttpStatus = require('http-status-codes');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient
var mongoURL = 'mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds149437.mlab.com:49437/cs336';
MongoClient.connect(mongoURL, function (err, dbConnection) {
  if (err) throw err;
  db = dbConnection;
});

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var PEOPLE_FILE = path.join(__dirname, 'people.json');

/////////////////////////////////////////////
//server code//
app.get('/people', function (req, res) {
  db.collection("peopleCollection").find({}).toArray(function(err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

app.get('/person/:id', function (req, res) {
  var theID = parseInt(req.params.id, 10); //have to convert to int
  db.collection("peopleCollection").find({personId: theID}).toArray(function(err, docs) {
    if (err) throw err
    res.json(docs);
  });
});

app.delete('/person/:id', function(req, res) {
  var theID = parseInt(req.params.id, 10); //have to convert to int
  db.collection("peopleCollection").remove({personId: theID});
  res.send('Person ' + req.params.id + " removed!");

});

app.get('/person/:id/name', function (req, res) {
  var theID = parseInt(req.params.id, 10); //have to convert to int
  //got the idea for the forEach function from http://stackoverflow.com/questions/23676205/how-to-return-only-value-of-a-field-in-mongodb
  db.collection("peopleCollection").find({personId: theID}).forEach(function (person) {
    res.send(person.firstName + " " + person.lastName);
  });
});

app.get('/person/:id/years', function (req, res) {
  var theID = parseInt(req.params.id, 10); //have to convert to int
  db.collection("peopleCollection").find({personId: theID}).forEach(function(person) {
    res.send("Years: " + person.years);
  });
});

// this is not relevant any more
// app.get("/fetchPerson", function(req, res) {
//     var person = getById(req.query.user_id);
//     res.send(person);
// });

app.post('/people', function (req, res) {
  //create a new person to add
  var newPerson = {
    personId: parseInt(req.body.personId, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    years: parseInt(req.body.years, 10)
  }

  //add the new person to the collection
  db.collection("peopleCollection").insert(newPerson, function(err, result) {
    if (err) throw err;
  });
});

//send 404 if any other path
app.get("*", function (req, res) {
	res.sendStatus(404);
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});
