'use strict';

var messagesFilename = './data/messages.json';

var fs = require('fs');

// pass in callback or similar to next
// pass in err and messages. when we call the function, we can pass in messages

exports.read = function (callback) { 
	fs.readFile(messagesFilename, function (err, data) {
		var messages = JSON.parse(data);
		callback(err, messages);
		// console.log('messages: ', messages)
	});
	 //return messages; // it will return undefined
};

// first argument : an array of messages, second arg : callback
exports.write = function (messages, callback) {
	var messagesJSON = JSON.stringify(messages);
	fs.writeFile(messagesFilename, messagesJSON, function (err) {
		callback(err);
	});
};
	// fs.writeFile('./data/messages.json', JSON.stringify(newData), function (err, newData) {
		// fs.writeFile(messagesFilename, callback)