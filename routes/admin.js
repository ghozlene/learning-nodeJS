const express = require('express');

const router = express.Router();

router.post('/add-product', (req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});
router.get('/add-product', (req, res, next) => {
	console.log('this is first middleware');
	res.send(
		'<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">send</button></form>'
	);
});
module.exports = router;
