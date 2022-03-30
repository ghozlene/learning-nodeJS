const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class User {
	constructor(username, email, cart, id) {
		this.username = username;
		this.email = email;
		this.cart = cart;
		this._id = id ? new mongodb.ObjectId(id) : null;
	}
	save() {
		const db = getDb();
		let dbOp;
		if (this._id) {
			dbOp = db
				.collection('users')
				.updateOne({ _id: this._id }, { $set: this });
		} else {
			dbOp = db.collection('users').insertOne(this);
		}
		return dbOp
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
	addToCart(product) {
		const cartProductIndex = this.cart.items.findIndex((cp) => {
			return cp.productId.toString() === product._id.toString();
		});
		let newQuantity = 1;
		const updatedCartItems = [...this.cart.items];
		if (cartProductIndex >= 0) {
			newQuantity = this.cart.items[cartProductIndex].quantity + 1;
			updatedCartItems[cartProductIndex].quantity = newQuantity;
		} else {
			updatedCartItems.push({
				productId: new ObjectId(product._id),
				quantity: newQuantity,
			});
		}
		const updateCart = {
			items: updatedCartItems,
		};
		const db = getDb();
		return db
			.collection('users')
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: updateCart } }
			);
	}
	static findUserById(userId) {
		const db = getDb();
		return db
			.collection('users')
			.find({ _id: new ObjectId(userId) })
			.next()
			.then((user) => {
				console.log(user);
				return user;
			})
			.catch((err) => console.log(err));
	}
	getCart() {
		const db = getDb();
		const productIds = this.cart.items.map((i) => {
			return i.productId;
		});
		return db
			.collection('products')
			.find({ _id: { $in: productIds } })
			.toArray()
			.then((products) => {
				return products.map((p) => {
					return {
						...p,
						quantity: this.cart.items.find((i) => {
							return i.productId.toString() === p._id.toString();
						}).quantity,
					};
				});
			});
	}
}

module.exports = User;
