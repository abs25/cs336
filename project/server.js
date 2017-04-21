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

// http://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd
// http://stackoverflow.com/questions/11591854/format-date-to-mm-dd-yyyy-in-javascript
// Helper function for getting date in a readable format
function dateFunction() {
	var todaysDate = new Date();
	var month = '' + (todaysDate.getMonth() + 1);
	var day = '' + todaysDate.getDate();
	var year = todaysDate.getFullYear();
	// Months with leading 0s (e.g. 01, 02, 03...)
	if(month.length < 2) {
		month = '0' + month;
	}
	// Days with leading 0s
	if(day.length < 2) {
		day = '0' + day;
	}
	var readableFormat = (month + '/' + day + '/' + year);
	return readableFormat;
};

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

// Serve up an error page should there be a problem.
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

// Get the top 10 scores
// TODO: Use the constant DEFAULT_LENGTH for getting any number of scores
app.get('/top10/:score', function(req, res) {
	var collection = db.collection('scores');

	var playerScore = req.params.score;

	// Get the index of the player, if found
	var index = -1;

	// Store the index and obtained scores
	var scoreJSON = {};

	// Do a "fake post" where we create a JSON object with the player's score
	var newScore = {name: "YOU", score: playerScore, date: dateFunction(), difficulty: "YOUR_DIFFICULTY"};

	// Sort descending, limit 10 scores, and return them
	collection.find({}).sort({score: -1}).limit(10).toArray(function(err, docs) {
		if(err) throw err;

		// Loop through scores, check if player's score is in top 10
		for(i = 0; i < 9; i++) {
			if(newScore.score >= docs[i].score) {
				// https://www.tutorialspoint.com/javascript/array_splice.htm\
				// Yes. Insert the score into that spot of the array, and remove a score below
				docs.splice(i, 1, newScore);
				index = i;
				break;
			}
		}
		// Store the index of the player and the scores obtained
		scoreJSON = {"position": index, "scores": docs};
		res.json(scoreJSON);
	})
})

// Get the bottom 10 scores
app.get('/bottom10/:score', function(req, res) {
	var collection = db.collection('scores');

	var playerScore = req.params.score;

	// Position of the player
	var index = {position: -1};

	// Store index and obtained scores
	var scoreJSON = {};

	var newScore = {name: "YOU", score: playerScore, date: dateFunction(), difficulty: "YOUR_DIFFICULTY"};

	// Sort ascending, limit 10 scores, and return them
	collection.find({}).sort({score: 1}).limit(10).toArray(function(err, docs) {
		if(err) throw err;

		// Loop through scores, check if player's score is in bottom 10
		for(i = 0; i < 9; i++) {
			if(newScore.score <= docs[i].score) {
				// https://www.tutorialspoint.com/javascript/array_splice.htm\
				// Yes. Insert the score into that spot of the array, and remove a score below
				docs.splice(i, 1, newScore);
				index = i;
				break;
			}
		}
		scoreJSON = {"position": index, "scores": docs};
		res.json(scoreJSON);
	});
});

// This route was written with blood, sweat, and tears.
// TODO: Make this route more efficient ;-;
// Get the scores nearby the player's score.
app.get('/nearby/:score', function(req, res) {
	var collection = db.collection('scores');

	var playerScore = req.params.score;

	// Position of the player's score in the array of scores
	var index = -1;

	var scoreJSON = {};

	var scoresArray = [];

	var newScore = {name: "YOU", score: playerScore, date: dateFunction(), difficulty: "YOUR_DIFFICULTY"};

	// Get all of the scores
	collection.find({}).sort({score: -1}).toArray(function(err, allScores){

		if(err) throw err;

		// Get the current first place and last place scores
		var firstPlaceScore = allScores[0];
		var lastPlaceScore = allScores[allScores.length-1];

		// Is the new player's score in first place?
		if(newScore.score >= firstPlaceScore.score) {
			// Yes. Get the next 9 scores.
			scoresArray.push(newScore);
			scoresArray = scoresArray.concat((allScores.slice(0, 9)));
			// The position of the player is at the start.
			index = 0;
			scoreJSON = {"position": index, "scores": scoresArray};
			res.json(scoreJSON);
		// Is the new player's score in last place?
		} else if(newScore.score <= lastPlaceScore.score){
			// Yes. Get the previous 9 scores.
			scoresArray = scoresArray.concat(allScores.slice((allScores.length-9), allScores.length+1));
			scoresArray.push(newScore);
			// The position of the player is at the end.
			index = scoresArray.length-1;
			scoreJSON = {"position": index, "scores": scoresArray};
			res.json(scoreJSON);
		// Else, we're not in either place.
		} else {
			// Get the scores greater than the player's score
			collection.find({ score: { $gt: Number(playerScore) }}).sort({score: -1}).toArray(function(err, docs) {
				if(err) throw err;

				// Are there less than 4 scores greater than the player?
				if(docs.length >= 4) {
					// Nope. Get four scores above
					scoresArray = docs.slice((docs.length-4), docs.length);

					// Stick the player's score into the scores array
					scoresArray.push(newScore);
					// The player's position should be at the fifth position in the array.
					index = 4;
					// Get the scores that are less than the player
					collection.find({ score: {$lte: Number(playerScore) }}).sort({score: -1}).toArray(function(err, docs2) {
						// If there are more than 5 scores less than the player,
						// take 5 from the array
						if(docs2.length >= 5) {
							scoresArray = scoresArray.concat(docs2.slice(0, 5));
							// Else, just concat the scores (we don't have five scores below the player)
						} else {
							scoresArray = scoresArray.concat(docs2);
						}
						scoreJSON = {"position": index, "scores": scoresArray};
						res.json(scoreJSON);
					});

				} else {
					// We have less than four scores, so we're good.
					// Push the player's score onto the docs array
					docs.push(newScore);
					// The player's position is at the end of the docs array
					index = docs.length-1;
					// Get the scores that are less than the player
					collection.find({ score: {$lte: Number(playerScore) }}).sort({score: -1}).toArray(function(err, docs2) {
						var holder2 = [];
						// Less than 5 scores?
						if(docs2.length >= 5) {
							// No.
							scoresArray = docs.concat(docs2.slice(0, 5));
						} else {
							// Yes.
							scoresArray = docs.concat(docs2);
						}
						scoreJSON = {"position": index, "scores": scoresArray};
						res.json(scoreJSON);
					});
				}
			});
		}
	});
});

// Routes to use when the player decides to submit their score
// top10
app.get('/submit/top10/:score', function(req, res) {
	var collection = db.collection('scores');

	var playerScore = req.params.score;

	// Get the index of the player, if found
	var index = -1;

	// Store the index and obtained scores
	var scoreJSON = {};

	// Sort descending, limit 10 scores, and return them
	collection.find({}).sort({score: -1}).limit(10).toArray(function(err, docs) {
		if(err) throw err;

		// Loop through scores, check if player's score is in top 10
		for(i = 0; i < 9; i++) {
			if(playerScore >= docs[i].score) {
				// Yes. Store the index
				index = i;
				break;
			}
		}
		// Store the index of the player and the scores obtained
		scoreJSON = {"position": index, "scores": docs};
		res.json(scoreJSON);
	})
})

// bottom10
app.get('/submit/bottom10/:score', function(req, res) {
	var collection = db.collection('scores');

	var playerScore = req.params.score;

	// Position of the player
	var index = {position: -1};

	// Store index and obtained scores
	var scoreJSON = {};

	// Sort ascending, limit 10 scores, and return them
	collection.find({}).sort({score: 1}).limit(10).toArray(function(err, docs) {
		if(err) throw err;

		// Loop through scores, check if player's score is in bottom 10
		for(i = 0; i < 9; i++) {
			if(newScore.score <= docs[i].score) {
				index = i;
				break;
			}
		}
		scoreJSON = {"position": index, "scores": docs};
		res.json(scoreJSON);
	});
});

// This route was written with blood, sweat, and tears.
// TODO: Make this route more efficient ;-;
// Get the scores nearby the player's score.
app.get('/submit/nearby/:score', function(req, res) {
	var collection = db.collection('scores');

	var playerScore = req.params.score;

	// Position of the player's score in the array of scores
	var index = -1;

	var scoreJSON = {};

	var scoresArray = [];

	// Get all of the scores
	collection.find({}).sort({score: -1}).toArray(function(err, allScores){

		if(err) throw err;

		// Get the current first place and last place scores
		var firstPlaceScore = allScores[0];
		var lastPlaceScore = allScores[allScores.length-1];

		// Is the new player's score in first place?
		if(playerScore >= firstPlaceScore.score) {
			// Yes. Get the next 10 scores.
			scoresArray = scoresArray.concat((allScores.slice(0, 10)));
			// The position of the player is at the start.
			index = 0;
			scoreJSON = {"position": index, "scores": scoresArray};
			res.json(scoreJSON);
		// Is the new player's score in last place?
	} else if(playerScore <= lastPlaceScore.score){
			// Yes. Get the previous 10 scores.
			scoresArray = scoresArray.concat(allScores.slice((allScores.length-10), allScores.length+1));
			// The position of the player is at the end.
			index = scoresArray.length-1;
			scoreJSON = {"position": index, "scores": scoresArray};
			res.json(scoreJSON);
		// Else, we're not in either place.
		} else {
			// Get the scores greater than the player's score
			collection.find({ score: { $gt: Number(playerScore) }}).sort({score: -1}).toArray(function(err, docs) {
				if(err) throw err;

				// Are there less than 4 scores greater than the player?
				if(docs.length >= 4) {
					// Nope. Get four scores above
					scoresArray = docs.slice((docs.length-4), docs.length);

					// The player's position should be at the fifth position in the array.
					index = 4;
					// Get the scores that are less than the player
					collection.find({ score: {$lte: Number(playerScore) }}).sort({score: -1}).toArray(function(err, docs2) {
						// If there are more than 5 scores less than or equal to the player,
						// take 6 from the array
						if(docs2.length >= 5) {
							scoresArray = scoresArray.concat(docs2.slice(0, 6));
							// Else, just concat the scores (we don't have five scores below the player)
						} else {
							scoresArray = scoresArray.concat(docs2);
						}
						scoreJSON = {"position": index, "scores": scoresArray};
						res.json(scoreJSON);
					});

				} else {
					// We have less than four scores, so we're good.
					// The player's position is at the end of the docs array
					index = docs.length-1;
					// Get the scores that are less than the player
					collection.find({ score: {$lte: Number(playerScore) }}).sort({score: -1}).toArray(function(err, docs2) {
						var holder2 = [];
						// Less than 5 scores?
						if(docs2.length >= 5) {
							// No.
							scoresArray = docs.concat(docs2.slice(0, 6));
						} else {
							// Yes.
							scoresArray = docs.concat(docs2);
						}
						scoreJSON = {"position": index, "scores": scoresArray};
						res.json(scoreJSON);
					});
				}
			});
		}
	});
});

// Post a new score to the database
app.post('/score', function(req, res) {
	var newScore = {
		name: req.body.name,
		score: Number(req.body.score),
		date: dateFunction(),
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
