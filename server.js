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
app.get('/top10/:score', function(req, res) {
	var collection = db.collection('scores');

	//TODO: Check if the player's score is in the top 10.
	var playerScore = req.params.score;

	//Sort descending, limit 10 scores, and return them
	collection.find({}).sort({score: -1}).limit(10).toArray(function(err, docs) {
		if(err) throw err;

		res.json(docs);
	})
})

//Get the bottom 10 scores
app.get('/bottom10/:score', function(req, res) {
	var collection = db.collection('scores');

	//TODO: Check if the player's score is in the bottom 10.
	var playerScore = req.params.score;

//	var newScore = {id: 100, name: "YOUR_NAME", score: playerScore, date: new Date(), difficulty: "YOUR_DIFFICULTY"};
	//Sort ascending, limit 10 scores, and return them
	collection.find({}).sort({score: 1}).limit(10).toArray(function(err, docs) {
		if(err) throw err;

//		for(i = 0; i < 9; i++) {
//			if(newScore.score <= docs[i].score) {
//				docs.splice(i, 0, newScore);
//				break;
//			}
//		}
		res.json(docs);
	});
});

//This route was written with blood, sweat, and tears.
//TODO: Make this route more efficient ;-;
//Get the scores nearby the player's score.
app.get('/nearby/:score', function(req, res) {
	var collection = db.collection('scores');

	var playerScore = req.params.score;

	var scoresArray = [];

	var newScore = {id: 100, name: "YOUR_NAME", score: playerScore, date: new Date(), difficulty: "YOUR_DIFFICULTY"};

	//Get all of the scores
	collection.find({}).sort({score: -1}).toArray(function(err, allScores){

		if(err) throw err;

		//Get the current first place and last place scores
		var firstPlaceScore = allScores[0];
		var lastPlaceScore = allScores[allScores.length-1];

		//Is the new player's score in first place?
		if(newScore.score >= firstPlaceScore.score) {
			//Yes. Get the next 9 scores.
			scoresArray.push(newScore);
			scoresArray = scoresArray.concat((allScores.slice(0, 9)));
			res.json(scoresArray);
		//Is the new player's score in last place?
		} else if(newScore.score <= lastPlaceScore.score){
			//Yes. Get the previous 9 scores.
			scoresArray = scoresArray.concat(allScores.slice((allScores.length-8), allScores.length+1));
			scoresArray.push(newScore);
			res.json(scoresArray);
		//Else, we're not in either place.
		} else {
			//Get the scores greater than the player's score
			collection.find({ score: { $gt: Number(playerScore) }}).sort({score: -1}).toArray(function(err, docs) {
				if(err) throw err;

				//Are there less than 4 scores greater than the player?
				if(docs.length >= 4) {
					//Nope. Get four scores above
					scoresArray = docs.slice((docs.length-4), docs.length);

					//Stick the player's score into the scores array
					scoresArray.push(newScore);

					//Get the scores that are less than the player
					collection.find({ score: {$lte: Number(playerScore) }}).sort({score: -1}).toArray(function(err, docs2) {
						//If there are more than 5 scores less than the player,
						//take 5 from the array
						if(docs2.length >= 5) {
							scoresArray = scoresArray.concat(docs2.slice(0, 5));
							//Else, just concat the scores (we don't have five scores below the player)
						} else {
							scoresArray = scoresArray.concat(docs2);
						}
						res.json(scoresArray);
					});

				} else {
					//We have less than four scores, so we're good.
					//Push the player's score onto the docs array
					docs.push(newScore);
					//Get the scores that are less than the player
					collection.find({ score: {$lte: Number(playerScore) }}).sort({score: -1}).toArray(function(err, docs2) {
						var holder2 = [];
						//Less than 5 scores?
						if(docs2.length >= 5) {
							//No.
							scoresArray = docs.concat(docs2.slice(0, 5));
						} else {
							//Yes.
							scoresArray = docs.concat(docs2);
						}
						res.json(scoresArray);
					});
				}
			});
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
