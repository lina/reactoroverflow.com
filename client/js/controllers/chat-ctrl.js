'use strict';

/**
 * Create Controller
 */

angular.module('RDash')
.controller('ChatCtrl', function ChatCtrl ($scope, $rootScope) {
  jQuery(function($){
    var $nickForm = $('#setNick');
    var $nickError = $('#nickError');
    var $nickBox = $('#nickname');
    var $usersList = $('#usersList');
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');
    var $templateWrap= $('.templateWrap');
    var selectedUserToSend = $rootScope.selectedUserID;
    $templateWrap.append('Chatting to: ', selectedUserToSend.slice(6));

    $messageForm.submit(function(e){
      e.preventDefault();
      socket.emit('send message', $messageBox.val(), selectedUserToSend, function(data){
        $chat.append('<span class="error">' + data + "</span><br/>");
      });
      $messageBox.val('');
    });

    // socket.on('send message', function(data, callback){
    //   console.log("hello");
    //   var msg = data.trim();
    //   var name = selectedUserToSend;
    //   var msg = msg.substring(ind + 1);
    //   if(name in users){
    //     users[name].emit('whisper', {msg: msg, nick: socket.nickname});
    //     socket.emit('whisper', {msg: msg, nick: socket.nickname});
    //   } else {
    //     callback('Error!  Enter a valid user.');
    //   }
    // });

    // socket.on('send message', function(data, callback){
    //   var msg = data.trim();
    //   // if(msg.substr(0,3) === '/w '){
    //     // msg = msg.substr(3);
    //     // var ind = msg.indexOf(' ');
    //     // if(ind !== -1){
    //   // var name = msg.substring(0, ind);
    //   var msg = msg.substring(ind + 1);
    //   if(name in users){         
    //     users[name].emit('whisper', {msg: msg, nick: socket.nickname});
    //     socket.emit('whisper', {msg: msg, nick: socket.nickname});
    //   } else {
    //     callback('Error!  Enter a valid user.');
    //   };
    //   // } else { // if ind !== -1
    //     //   callback('Error!  Please enter a message for your whisper.');
    //   //   // };
    //   // } else {  //if msg = /w
    //   //   io.sockets.emit('new message', {msg: msg, nick: socket.nickname});
    //   // };
    // });

    // socket.on('send message', function(data, callback){
    //   var msg = data.trim();
    //   if(msg.substr(0,3) === '/w '){
    //     msg = msg.substr(3);
    //     var ind = msg.indexOf(' ');
    //     if(ind !== -1){
    //     var name = msg.substring(0, ind);
    //     var msg = msg.substring(ind + 1);
    //     if(name in users){         
    //       users[name].emit('whisper', {msg: msg, nick: socket.nickname});
    //       socket.emit('whisper', {msg: msg, nick: socket.nickname});
    //     } else {
    //       callback('Error!  Enter a valid user.');
    //     };
    //   } else { // if ind !== -1
    //       callback('Error!  Please enter a message for your whisper.');
    //     };
    //   } else {  //if msg = /w
    //     io.sockets.emit('new message', {msg: msg, nick: socket.nickname});
    //   };
    // });

    // socket.on('send message', function(data, callback){
    //   var msg = data.trim();
    //   var name = selectedUserToSend;
    //   var msg = msg.substring(ind + 1);
    //   if(name in users){
    //     users[name].emit('whisper', {msg: msg, nick: socket.nickname});
    //     socket.emit('whisper', {msg: msg, nick: socket.nickname});
    //   } else {
    //     callback('Error!  Enter a valid user.');
    //   };
    // });
    
    socket.on('new message', function(data){
      $chat.append('<span class="msg"><b>' + data.nick + ': </b>' + data.msg + "</span><br/>");
    });
    
    socket.on('whisper', function(data){
      $chat.append('<span class="whisper"><b>' + data.nick + ': </b>' + data.msg + "</span><br/>");
    });
  });

});
