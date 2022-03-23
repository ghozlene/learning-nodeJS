const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
	const url = req.url;
	const method = req.method;
	if (url === '/') {
		res.write('<html>');
		res.write(
			'<head><title>forms</title></head><body><form action="/message" method="POST"><input type="text" name="name"/><button type="submit">Send</button></form></body>'
		);

		res.write('</html>');
		return res.end();
	}
	if (url === '/message' && method === 'POST') {
		fs.writeFileSync('message.txt', 'dummy data');
		res.statusCode = 302;
		res.setHeader('location', '/');
		return res.end();
	}
	res.setHeader('Content-Type', 'text/html');
	res.write('<html>');
	res.write(
		'<head><title>my page</title></head><body><h1>my first course</h1></body>'
	);

	res.write('</html>');
	res.end();
});

server.listen(3000);
