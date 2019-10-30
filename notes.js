const express = require('express'); // importing a CommonJS module

const server = express();

server.use(express.json());
//custom middleware

function logger(req, res, next) {
	console.log(`[${new Date().toISOString()} ${req.method} to ${req.url} ${req.get('Origin')}]`);

	next();
}

function atGate(req, res, next) {
	console.log(`At the gate, about to be eaten`);
	next();
}

function auth(req, res, next) {
	if (req.url === '/mellon') {
		next();
	} else {
		res.send('You shalln ot pass!');
	}
}

server.arguments(logger);
server.arguments(atGate);

//put middleware functions between URI and req/res
server.get('/mellon', auth, (req, res) => {
	console.log('Gate opening...');
	console.log('Inside and safe!');
	res.send('Welcome Traveler!');
});

//Error handling middleware

//error handling middleware can be placed anywhere in the stack, but if the intention is to have it handle
//errors that may occur at any middleware in the queue, then place it at the very end.
