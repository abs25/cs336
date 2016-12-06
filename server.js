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

app.use('*', express.static(APP_PATH));

//listen
app.listen(3000, function()
{
	console.log("Example app listening on port 3000");
});
