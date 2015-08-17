'use strict';

var app = require('./lib/express');
var clog = require('./lib/clog');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

http.listen(4000, function(){
  clog.green('Listening on port 4000');
});

io.sockets.on('connection', function(socket){
  socket.on('new user', function(data, callback){
    console.log('socket.on new user, data', data);
    if (data in users){
      callback(false);
    } else {
      callback(true);
      console.log('-------------------> socket.on users, socket:', socket);
      socket.nickname = data;
      users[socket.nickname] = socket;
      updateNicknames();
    };
  });
  
  function updateNicknames(){
    io.sockets.emit('usernames', Object.keys(users));
  };

  socket.on('send message', function(data, receiverUser, callback){
    console.log("hello");
    console.log('---------------------->data',data);
    console.log('---------------------->receiverUser',receiverUser);

    var msg = data.trim();
    var name = receiverUser.slice(6);
    console.log('---------------------->users',users);
    console.log('---------------------->users[name]',users[name]);

    if(name in users){
      users[name].emit('whisper', {msg: msg, nick: socket.nickname});
      socket.emit('whisper', {msg: msg, nick: socket.nickname});
    } else {
      callback('Error!  Enter a valid user.');
    }
  });

  // socket.on('send message', function(data, callback){
  //   var msg = data.trim();
  //   if(msg.substr(0,3) === '/w '){
  //     // msg = msg.substr(3);
  //     // var ind = msg.indexOf(' ');
  //     // if(ind !== -1){
  //     var name = msg.substring(0, ind);
  //     var msg = msg.substring(ind + 1);
  //     if(name in users){         
  //       users[name].emit('whisper', {msg: msg, nick: socket.nickname});
  //       socket.emit('whisper', {msg: msg, nick: socket.nickname});
  //     } else {
  //       callback('Error!  Enter a valid user.');
  //     };
  //   // } else { // if ind !== -1
  //     //   callback('Error!  Please enter a message for your whisper.');
  //     // };
  //   } else {  //if msg = /w
  //     io.sockets.emit('new message', {msg: msg, nick: socket.nickname});
  //   };
  // });
  
  socket.on('disconnect', function(data){
    if(!socket.nickname) {return};
    delete users[socket.nickname];
    updateNicknames();
  });
});

// module.exports = io;
