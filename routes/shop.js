const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	console.log('this is the second middleware');

	res.send('<h1>hello nodejs</h1>');
});

module.exports = router;
