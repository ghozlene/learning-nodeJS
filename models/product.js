const getDb = require('../util/database').getDb;

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
};
