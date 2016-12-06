/**
* JediTrainer Website Server
* @author abs25, cpd5, drd26
*/
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var APP_PATH = path.join(__dirname, 'dist');

var MongoClient = require('mongodb').MongoClient;
var databaseConnection;

var url = 'mongodb://cs336:' + process.env.PASSWORD + '@ds113628.mlab.com:13628/jeditrainerdb';

MongoClient.connect(url, function(err, db) {
	if (err) throw err;

	databaseConnection = db;
});

var app = express();
app.use('/', express.static(APP_PATH));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//main page
app.get('/', function(req, res)
{
	res.send("da force");
});

//GET ALL DA SCORES
app.get('/scores', function(req, res) {
	var collection = databaseConnection.collection('scores');

	collection.find({}).toArray(function(err, docs) {
		if(err) throw err;

		res.json(docs);
	});

});

app.post('/score', function(req, res) {
	var newScore = {
		id: Number(req.body.id),
		name: req.body.name,
		score: Number(req.body.score),
		date: Date.now(),
		difficulty: req.body.difficulty
	}

	var collection = databaseConnection.collection('scores');
	collection.insert(newScore);
});

app.use('*', express.static(APP_PATH));

//listen
app.listen(3000, function()
{
	console.log("Example app listening on port 3000");
});
