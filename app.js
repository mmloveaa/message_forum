'use strict';


// VARIABLE DECLARATION
const PORT = 8001;


//Module Declaration
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

var Messages = require('./messages.js');

// Express App Instantiation
var app = express();


// general purpose middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

// ROUTES
app.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/messages', function (req, res) {
	Messages.read( function (err, messages) {
	if(err){
		res.status(400).send(err);
	}else {
		res.status(200).send(messages);
	}	
	});
});


// pseudocode
// req.body will be
// {

// }
	// if(err) {
	// 		return; //res.status(400).send(err);
	// }
	// res.send(messages);


app.post('/messages', function (req, res) {
	// data validation
	// console.log('before read')
	Messages.read( function (err, messages) {

		var newMessage = req.body;
		messages.push(newMessage);

		// console.log('before write')
        Messages.write(messages, function (err) {
			console.log('before send')
        	if(err) {
        		res.status(400).send(err);
        		return;
        	}
        	res.send();
		});
	});
});

// Messages.read(function (err, messages) {
// 	// add a message

// 	Messages.write(messages, function (err){

// 	});
// });

// app.get('/messages', function (req, res, next) {
// 	fs.readFile('./data/messages.json', function (err, data){
// 		var messages= JSON.parse(data);
// 		res.send(messages);
// 	})
// })












// Server Initialization
var server = http.createServer(app);

	

server.listen(PORT, function() {
	console.log(`Server listening on port ${PORT}`);
});