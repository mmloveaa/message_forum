'use strict';

$(document).ready(init);

function init(){
	getMessages();
	$('#newComment').on('click', newMessage);
}

function getMessages(){

		$.ajax({
			url: "/messages",
			method: "GET",
			success: function(data) {
				// console.log('data: ', data)
				    var messages = data.map(function(value){
					var $div = $('<div>').addClass('post');
					var $messa = $('<p>').text(value.body);
					var $author = $('<p>').text(value.author).addClass('info');
					var $time = $('<p>').text(value.time).addClass('info');
					$div.append($author).append($time).append('<hr>').append($messa);
					return $div;
				})
				$('#forum').append(messages);
			},
			error: function(err) {
				console.log('err: ', err)
			}
		})
}

function newMessage() {
	// console.log("button is clicked")
	var name = $('#name').val();
	$('#name').val("");
	var messageInput = $('#messageInput').val();
	$('#messageInput').val("");
	$.ajax({
		url: "/messages",
		method: "POST",
		data: {
			author: name,
			body: messageInput,
			time: "Today"
		},
		success: function (){
			var $div = $('<div>').addClass('post');
			var $messa = $('<p>').text(messageInput);
			var $author = $('<p>').text(name).addClass('info');
			var $time = $('<p>').text("Today").addClass('info');
			$div.append($author).append($time).append('<hr>').append($messa);
			$('#forum').append($div);
		}
	})

}