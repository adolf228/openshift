let app = require('express')();

app.get('/', (req, res) => {
	res.send('Привет, чувак!');
});

app.listen(8080);