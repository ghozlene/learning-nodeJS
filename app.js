const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
	// console.log('this always RUN');
	next();
});
app.use('/product', (req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});

app.use('/add-product', (req, res, next) => {
	console.log('this is first middleware');
	res.send(
		'<form action="/product" method="POST"><input type="text" name="title"><button type="submit">send</button></form>'
	);
});

app.use('/', (req, res, next) => {
	console.log('this is the second middleware');

	res.send('<h1>hello nodejs</h1>');
});

app.listen(3000);
