const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
	const products = adminData.products;
	console.log('shop.js: ', adminData.products);
	// console.log('this is the second middleware');

	// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
	res.render('shop', {
		prods: adminData.products,
		pageTitle: 'Shop',
		path: '/',
		hasProducts: products.length > 0,
		activeShop: true,
		productCSS: true,
	});
});

module.exports = router;
