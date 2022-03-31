const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.use((req, res, next) => {
	User.findUserById('624446e7d4940efdea869e7a')
		.then((user) => {
			req.user = new User(user.username, user.email, user.cart, user._id);
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
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.failPage);

mongoose
	.connect(
		'mongodb+srv://achref:achref123@cluster0.cdhux.mongodb.net/project1?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log(' connect with mongoose');
		app.listen(3000);
	})
	.catch((err) => console.log(err));
