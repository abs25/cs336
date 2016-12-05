/**
* JediTrainer Website Server
*
*/
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var databaseConnection;

var url = 'mongodb://jeditrainer:' + process.env.PASSWORD + '@ds113628.mlab.com:13628/jeditrainerdb';

MongoClient.connect(url, function(err, db) {
	if (err) throw err;

	databaseConnection = db;
});

var app = express();
app.use('/', express.static(path.join(__dirname, 'dist')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//main page
app.get('/', function(req, res)
{
	res.send("da force");
});

//listen
app.listen(3000, function()
{
	console.log("Example app listening on port 3000");
});
