const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(dateLogger);
server.use(logger);
server.use(gateKeeper);

server.use('/api/hubs', hubsRouter);

function dateLogger(req, res, next) {
	console.log(`${new Date().toISOString()}`);

	next();
}

function logger(req, res, next) {
	console.log(`${req.method} to ${req.url}`);

	next();
}

//change the gateKeeper to return a 400 if no password is provided
function gateKeeper(req, res, next) {
	const password = req.headers.password;
	if (!password) {
		res.status(400).json({ message: 'please provide a password' });
	} else if (password === 'mellon') {
		next();
	} else {
		res.status(400).json({ you: 'shall not pass!' });
	}
}

server.get('/', (req, res) => {
	const nameInsert = req.name ? ` ${req.name}` : '';

	res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
