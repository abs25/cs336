/**
* JediTrainer Website Server
* @author abs25, cpd5, drd26
*/

//I know why date is wonky for some of the records.
//Date.now() returns the number of MILLISECONDS passed after
//a certain date.
//This means, that huge integer is the number of milliseconds passed
//after that certain date.
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

//Get the top 10 scores
app.get('/top10', function(req, res) {
	var collection = db.collection('scores');

	//Sort descending, limit 10 scores, and return them
	collection.find({}).sort({score: -1}).limit(10).toArray(function(err, docs) {
		if(err) throw err;

		res.json(docs);
	})
})

//Get the bottom 10 scores
app.get('/bottom10', function(req, res) {
	var collection = db.collection('scores');

	//Sort ascending, limit 10 scores, and return them
	collection.find({}).sort({score: 1}).limit(10).toArray(function(err, docs) {
		if(err) throw err;

		res.json(docs);
	});
});

//Get five scores above and below a player's score
app.get('/nearby/:name', function(req, res) {
	var collection = db.collection('scores');

	var userName = req.params.name;

	var index = 0;

	//Since there is no formal function for getting the index of a
	//record in a MongoDB database, I have to do this.
	collection.find({}).toArray(function(err, docs) {
		//Get the index of the record
		for(i = 0; i < docs.length; i++) {
			if(docs[i].name === userName) {
				break;
			}
			index++;
		}

		//Got the index.
		//If the score is in first place...
		if(index == 0) {
			//Get the next 10 records.
			var scores = docs.slice(1, 11);
			res.json(scores);
		}
		else if(index == docs.length-1) { //Else, if the score is in last place...
			//http://stackoverflow.com/questions/7538519/how-to-get-subarray-from-array
			//https://www.w3schools.com/jsref/jsref_slice_array.asp
			//Get the previous 10 records.
			var scores = docs.slice((docs.length-11), docs.length-1);
			res.json(scores);
		} else { //Else, the score is somewhere in the middle...
			//Check if the index is close to the lower or upper bounds of the array.
			//If so, use the index as a pivot
			var lookAheadUpper = index+5;
			var lookAheadLower = index-5;
			if(lookAheadLower < 0) { //Are we close to the first place score?
				//Yes.
				//Take the difference, and get those records after the score.
				//The reason why we subtract 10 is because we want a limit of
				//10 scores.
				//We could make it a constant should we ever want to
				//display more than 10 scores, but I'm unsure how that
				//would affect the math.
				var diff = (10-index);
				var scoresAbove = docs.slice(0, index);
				//Array is 0-indexed; add 1 to the index+diff calculation to get
				//the rest of the scores.
				var scoresBelow = docs.slice(index+1, index+diff+1);
				//http://stackoverflow.com/questions/433627/concat-json-objects
				//Concatenate both score arrays and return it
				scoresAbove = scoresAbove.concat(scoresBelow);
				res.json(scoresAbove);
			} else if(lookAheadUpper >= docs.length) { //Are we close to the lower place score?
				//Yes. Take the difference, and get those records before the score.
				var diff = 10-(docs.length-index)+1;
				var scoresAbove = docs.slice(index-diff, index);
				var scoresBelow = docs.slice(index+1, docs.length+1);
				scoresAbove = scoresAbove.concat(scoresBelow);
				res.json(scoresAbove);
			} else { //We're not close to either first or last place.
				//Slice 5 above and below the score.
				var scoresAbove = docs.slice(index-5, index);
				//+6 to include 5 scores (it doesn't include index+6...)
				var scoresBelow = docs.slice(index+1, index+6);
				scoresAbove = scoresAbove.concat(scoresBelow);
				res.json(scoresAbove);
			}
		}

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
