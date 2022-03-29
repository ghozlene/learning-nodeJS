const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
	mongoClient
		.connect(
			'mongodb+srv://achref:achref123@cluster0.cdhux.mongodb.net/project1?retryWrites=true&w=majority'
		)
		.then((client) => {
			console.log('conntected...');
			callback(client);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = mongoConnect;
