const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
module.exports = class Product {
	constructor(title, imageUrl, description, price, id) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		this._id = id;
	}
	save() {
		const db = getDb();
		let dbOp;
		if (this._id) {
			dbOp = db
				.collection('products')
				.updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
		} else {
			db.collection('products').insertOne(this);
		}
		return debOp
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
