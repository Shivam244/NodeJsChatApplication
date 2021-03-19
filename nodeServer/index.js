//Node server to handle socket io connections

// const { Server } = require('socket.io');
const io = require('socket.io')(8000);
const users = {};
const hostname = '127.0.0.1';
const port = 5500;


io.on('connection', socket=>{
    socket.on('new-user-joined', name =>{
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('joined', name)
    });

    socket.on('send', message=>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
  
});


