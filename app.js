const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
  let number = 0;

  socket.emit('welcomeUser', { msg: 'Thanks for connecting' });

  socket.on('increaseNumberToServer', function() {
    number++;
    io.emit('increaseNumberToClient', { counter: number });

    socket.on('decreaseNumberToServer', function(){
      number--;
      io.emit('decreaseNumberToClient', {counter: number});
    });
  });
})

app.get('*', (req, res) => {
  res.render('index');
});

server.listen(3000, () => {
  console.log('Express server is running!');
});
