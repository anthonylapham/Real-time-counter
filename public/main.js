$(document).ready(function() {
  const socket = io();

  socket.on('welcomeUser', function(data) {
    console.log('This is data from the server:', data.msg)
  });

  socket.on('increaseNumberToClient', function(data) {
    console.log('does this work?', data);
    $('#counter').text(data.counter);
  });

  socket.on('decreaseNumberToClient', function(newData){
    console.log('the number is:', newData);
    $('#counter').text(newData.counter);
  })

  $('#incrementBtn').on('click', function() {
    socket.emit('increaseNumberToServer')
  });

  $('.decrementBtn').on('click', function(){
    socket.emit('decreaseNumberToServer')
  });
});
