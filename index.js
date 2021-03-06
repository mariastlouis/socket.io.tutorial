var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){


  console.log('a user connected');
  socket.broadcast.emit('user connect', `A user has connected`)

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('typing', function() {
    socket.broadcast.emit('typing')
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
