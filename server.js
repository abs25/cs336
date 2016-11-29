/**
* JediTrainer Website Server
*
*/
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use('/', express.static(path.join(__dirname, 'app')));


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
