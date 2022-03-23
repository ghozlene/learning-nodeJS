const http = require('http');

const server = http.createServer((req, res) => {
	// console.log(req);
	res.setHeader('Content-Type', 'text/html');
	res.write('<html>');
	res.write(
		'<head><title>my page</title></head><body><h1>my first course</h1></body>'
	);

	res.write('</html>');
	res.end();
});

server.listen(3000);
