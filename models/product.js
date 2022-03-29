const mongoConnect = require('../util/database');

module.exports = class Product {
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}
	save() {}

	static deleteById(id, cb) {
		getProductFromFile((products) => {
			const product = products.find((p) => p.id === id);
			const updatedProducts = products.filter((p) => p.id !== id);
			fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
				if (!err) {
					Cart.deleteProduct(id, product.price);
				}
			});
		});
	}
	static fetchAll(cb) {
		getProductFromFile(cb);
	}

	static findById(id, cb) {
		getProductFromFile((products) => {
			const product = products.find((p) => p.id === id);
			cb(product);
		});
	}
};
