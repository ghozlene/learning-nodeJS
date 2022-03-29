const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
	mongoClient
		.connect(
			'mongodb+srv://achref:achref123@cluster0.cdhux.mongodb.net/project1?retryWrites=true&w=majority'
		)
		.then((client) => {
			console.log('conntected...');
			_db = client.db();
			callback();
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
	const getDb = () => {
		if (_db) {
			return _db;
		} else {
			throw 'no DB found sorry !';
		}
	};
};

exports.mongoConnect = mongoConnect;
exports.getDb = this.getDb;
