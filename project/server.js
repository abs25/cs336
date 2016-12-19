/**
* JediTrainer Website Server
* @author abs25, cpd5, drd26
*/
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var APP_PATH = path.join(__dirname, 'dist');

var MongoClient = require('mongodb').MongoClient;
var db;

var url = 'mongodb://cs336:' + process.env.PASSWORD + '@ds113628.mlab.com:13628/jeditrainerdb';
var port = process.env.PORT || 3000;

MongoClient.connect(url, function(err, databaseConnection) {
	if (err) throw err;

	db = databaseConnection;
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
	var query = req.query;
	var searchFilter = query.searchFilter;
	var sortFilter = query.sortFilter;
	var lengthFilter = query.lengthFilter;

	var collection = db.collection('scores');

	var findQuery = {};
	if(searchFilter != null && searchFilter != ''){
		findQuery.$query = {name: searchFilter};
	}

	if(lengthFilter == null || lengthFilter == ''){
		lengthFilter = 10;
	}

	switch(sortFilter){
		case "Top":
			//findQuery.$orderby = { score : -1};
			sortFilter = {score : -1};
			break;
		case "New":
			//findQuery.$orderby = { date : -1};
			sortFilter = { date : -1};
			break;
		case "Month":
			//findQuery.$orderby = { score : -1, date : -1}
			sortFilter = {date : -1, score : -1};
			break;
		default:
			sortFilter = {};
	}

	// this will get the whole list of scores
	collection.find(findQuery).sort(sortFilter).limit(parseInt(lengthFilter)).toArray(function(err, docs) {
		if(err) throw err;

		res.json(docs);
	});

});

app.get('/top', function(req, res) {
	//Get the top 10 high scores
	db.collection('scores').find({}).sort({score: -1}).limit(10).toArray(function(err, docs) {
		if(err) throw err;
		res.json(docs);
	});
});

//Change the names later...
app.get('/new', function(req, res) {

});

app.get('/last', function(req, res) {

});

app.post('/score', function(req, res) {
	var newScore = {
		id: Number(req.body.id),
		name: req.body.name,
		score: Number(req.body.score),
		date: Date.now(),
		difficulty: req.body.difficulty
	}

	var collection = db.collection('scores');
	collection.insert(newScore);
});

app.use('*', express.static(APP_PATH));

//listen
app.listen(port, function()
{
	console.log("Example app listening on port " + port);
});
