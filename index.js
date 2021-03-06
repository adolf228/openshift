let io = require('socket.io')(3000),
	express = require('express'),
	app = express();

	app.use(express.static('public'));

	app.get('/', (req, res) => {
		sendFile('index.html');
	});

io.on('connect', (socket) => {
    io.emit('user connected', socket.id);
    console.log('User ' + socket.id + ' connected');

    socket.on('send message', (message) => {
        var message = JSON.stringify({userName: socket.id, messageText: message});
        io.emit('send message', message);
        console.log(socket.id + ': ' + message);
    });

    socket.on('write message', (userId) => {
        io.emit('write message', userId);
    });

    socket.on('disconnect', () => {
        io.emit('user disconnected', socket.id);
        console.log('User ' + socket.id + ' disconnected');
    });

});

    app.listen(8080);
