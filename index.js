const http = require('http');
const fs = require('fs')
const clase = require('./clase')
const url = require('url')

var clases = []

function render(path, res) {
	fs.readFile(path, null, function(error, data) {
		if(error) {
			res.writeHead(404)
			res.write(":( algo salio mal")
		}
		else { 
			res.write(data)
		}
		res.end()
	})
}

function onRequest(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'})
	var path = url.parse(req.url).pathname
	if(path === '/') {
		render('./index.html', res)		
	}
	else {
		res.writeHead(404)
		res.write("Bruh wtf are you doing???")
		res.end()
	}
}

http.createServer(onRequest).listen(3000);


