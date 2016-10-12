/**
* Lab 06 Server
* @author Austin Snoeyink
*
* 6.1
* curl --head localhost:3000/request
* curl -X GET localhost:3000/request -d {"Person":"Chris"} -H 'Content-Type: application/json'
* curl -X POST localhost:3000/request -d {"Person":"Chris"} -H 'Content-Type: application/json'
* curl -X PUT localhost:3000/request -d {"Person":"Chris"} -H 'Content-Type: application/json'
* curl -X DELETE localhost:3000/request -d {"Person":"Chris"} -H 'Content-Type: application/json'
*
* a. We can test the GET method in chrome. We can test all four methods using cURL.
* b. The most appropriate response would be the 404 not found response. There's a reason it's default.
*
* 6.2
* a. HTTP forms support POST and PUT. 
* b. The form data is passed through the request header under the form-data section.
*
*/

var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');
var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/request', function (req, res) {
  res.send('Got a GET request');
});
app.get('forms', function (req, res) {
	res.send(form.html);
});

app.post('/request', function (req, res) {
  res.send('Got a POST request')
  
});

app.post('/forms', function (req, res) {
  res.send('Got a POST request'
  			+'<br>Posted name: <code>'+req.body.user_name+'</code>'
  			+'<br>Posted email: <code>'+req.body.user_mail+'</code>'
  			+'<br>Posted message: <code>'+req.body.user_message+'</code>')
  
});

app.put('/request', function (req, res) {
  res.send('Got a PUT request at');
});

app.delete('/request', function (req, res) {
  res.send('Got a DELETE request');
});

app.all('*', function (req, res) {
	res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



