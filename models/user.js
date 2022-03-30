const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class User {
	constructor(username, email, id, cart) {
		this.username = username;
		this.email = email;
		this._id = id ? new mongodb.ObjectId(id) : null;
		this.cart = cart;
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
		// 	const cartProduct = this.cart.items.findIndex((cp) => {
		// 		return cp._id === product._id;
		// 	});
		const updateCart = { items: [{ ...product, quantity: 1 }] };
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
}

module.exports = User;
