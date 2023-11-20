const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001', // Replace with your React app's URL
    methods: ['GET', 'POST'],
  },
});

// Serve your React build files (assuming the build folder is 'build')
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message1', (msg) => {
    
      io.emit('chat message1', msg);
    
  });

  socket.on('chat message2', (msg) => {
   
      io.emit('chat message2', msg);
    
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
