const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.getLogin = (req, res, next) => {
	// const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true';
	console.log(req.session.isLoggedIn);
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login',
		isAuthenticated: false,
	});
};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				return res.redirect('/login');
			}
			console.log(user);
			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save((err) => {
							console.log(err);
							res.redirect('/');
						});
					}
					res.redirect('/login');
				})
				.catch((err) => {
					console.log(err);
					res.redirect('/login');
				});
		})
		.catch((err) => console.log(err));
};

exports.getSignup = (req, res, next) => {
	res.render('auth/signup', {
		path: '/signup',
		pageTitle: 'Signup',
		isAuthenticated: false,
	});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};

exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	User.findOne({ email: email }).then((userDoc) => {
		if (userDoc) {
			res.redirect('/signup');
		}
		return bcrypt
			.hash(password, 12)
			.then((hashpassword) => {
				const user = new User({
					email: email,
					password: hashpassword,
					cart: { items: [] },
				});
				return user.save();
			})
			.then((result) => {
				res.redirect('/login');
			})
			.catch((err) => console.log(err));
	});
};
