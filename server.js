const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
	const parsedURL = url.parse(req.url, true);
	const path = parsedURL.pathname;
	const trimmedURL = path.replace(/^\/+|\/+$/g, '');
	const queryStringObject = parsedURL.query;

	if (trimmedURL === ''){
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.end('Hello world')
	} else if (trimmedURL === 'second') {
		res.writeHead(200, {'Content-Type':'text/plain'});
		const myReadShort = fs.createReadStream(__dirname + '/text.txt', 'utf8');
		myReadShort.pipe(res);
	} else if (trimmedURL === 'name') {
		res.writeHead(200, {'Content-Type':'text/plain'});
		queryStringObject.name ? res.end(`hello ${queryStringObject.name}`) : res.end(`hello noname`)
	} else {
		res.end('404')
	}
});

server.listen(3000, () => console.log('server works'));



