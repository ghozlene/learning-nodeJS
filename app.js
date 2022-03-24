const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
	console.log('this is first middleware');
	next();
});

app.use((req, res, next) => {
	console.log('this is the second middleware');
});
const server = http.createServer(app);

server.listen(3000);
