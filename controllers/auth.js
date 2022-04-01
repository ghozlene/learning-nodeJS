exports.getLogin = (req, res, next) => {
	isLoggedIn = req.get('Cookie').trim().split('=')[1];
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'login',
		isAuthenticated: isLoggedIn,
	});
};

exports.postLogin = (req, res, next) => {
	res.setHeader('Set-Cookie', 'loggedIn=true');
	res.redirect('/');
};
