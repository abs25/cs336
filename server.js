/**
* JediTrainer Website Server
* @author abs25, cpd5, drd26
*/
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var APP_PATH = path.join(__dirname, 'dist');
// This is the default number of scores presented to the client.
var DEFAULT_LENGTH = 10;

var MongoClient = require('mongodb').MongoClient;
var db;

// The database URL uses an environment variable PASSWORD to store the mongoDB password
var url = 'mongodb://cs336:' + process.env.PASSWORD + '@ds113628.mlab.com:13628/jeditrainerdb';
// If environment variable PORT exists, listen on that port. Otherwise listen on port 3000
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
	// This route should only be served if there is a problem.
	// Display an error message.
	res.send("Oops! Something has gone wrong, as if millions of voices suddenly cried out in terror and were suddenly silenced. I fear something terrible has happened.");
});

// Route to access the scores from the database
app.get('/scores', function(req, res) {
	// The request to this route is expected to have a query object attached.
	// Within query there are key-values for a search item, sort filter, and length to display.
	// These are specified within the client and passed to the server in the GET request.
	var query = req.query;
	// The search filter is the string by which to search for names.
	var searchFilter = query.searchFilter;
	// The sort filter is a string that specifies whether to order the results by top score or most recent.
	var sortFilter = query.sortFilter;
	// The length filter represents the number of scores expected to be returned by the request.
	var lengthFilter = query.lengthFilter;
	// This collection in the database stores the scores. It is what will be queried.
	var collection = db.collection('scores');

	// If there is a search term in the GET request, add it to the query as a filter.
	var findQuery = {};
	if(searchFilter != null && searchFilter != ''){
		findQuery.$query = {name: searchFilter};
	}

	// If there is no specified length filter, use the default.
	if(lengthFilter == null || lengthFilter == ''){
		lengthFilter = DEFAULT_LENGTH;
	}

	// Apply a sort filter
	switch(sortFilter){
		case "New":
			// If the sort filter is 'new', sort by date
			sortFilter = { date : -1};
			break;
		case "Month": // Used for best recent
			sortFilter = {date : -1, score : -1};
			break;
		case "Top":
		default:
			// If the sort filter is "top" or hasn't been specified, default to sort by scores.
			sortFilter = {score : -1};
			break;
	}

	// Query the database. Apply the search filter, sort filter, and length filter to the query.
	collection.find(findQuery).sort(sortFilter).limit(parseInt(lengthFilter)).toArray(function(err, docs) {
		if(err) throw err;
		// Send the results of the query back to the client
		res.json(docs);
	});

});

// This is the route that the game will use to post new scores.
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

// Serve the application
app.use('*', express.static(APP_PATH));

// Listen
app.listen(port, function()
{
	console.log("Example app listening on port " + port);
});
