const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
module.exports = class Product {
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}
	save() {
		const db = getDb();
		return db
			.collection('products')
			.insertOne(this)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
	static fetchAll() {
		const db = getDb();
		return db
			.collection('products')
			.find()
			.toArray()
			.then((products) => {
				console.log(products);
				return products;
			})
			.catch((err) => console.log(err));
	}
	static findById(prodId) {
		const db = getDb();
		return db
			.collection('products')
			.find({ _id: new mongodb.ObjectId(prodId) })
			.next()
			.then((product) => {
				console.log(product);
				return product;
			})
			.catch((err) => console.log(err));
	}
};
