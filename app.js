const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI =
	'mongodb+srv://achref:achref123@cluster0.cdhux.mongodb.net/project1?retryWrites=true&w=majority';

const app = express();

const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions',
});

app.use((req, res, next) => {
	User.findById('6246347dad1dc1349a59595c')

		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'secretStringneedtobelong',
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.failPage);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		User.findOne().then((user) => {
			if (!user) {
				const user = new User({
					name: 'ACHREF',
					email: 'Achref@gmail.com',
					cart: { items: [] },
				});
				user.save();
				console.log(' connect with mongoose');
			}
		});

		app.listen(3000);
	})
	.catch((err) => console.log(err));
