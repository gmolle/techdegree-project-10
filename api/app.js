/* eslint-disable no-console */
'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const sequelize = require('./models').sequelize;
const cors = require('cors');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// use cors for all routes
app.use(cors());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// Middleware that tells express incoming data should be read as json
// and also that it should be made available in the req.body
app.use(express.json());


// routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the REST API project!',
	});
});

// send 404 if no other route matched
app.use((req, res) => {
	res.status(404).json({
		message: 'Route Not Found',
	});
});

// setup a global error handler
app.use((err, req, res, next) => {
	if (enableGlobalErrorLogging) {
		console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
	}

	res.status(err.status || 500).json({
		message: err.message,
		error: {},
	});
});


// set our port
app.set('port', process.env.PORT || 5000);


sequelize
	// test database connection
	.authenticate()
	.then(() => {
		console.log('Database connection successful.');
	})
	.then(() => {
		// start listening on our port
		const server = app.listen(app.get('port'), () => {
			console.log(
				`Express server is listening on port ${server.address().port}`
			);
		});
	});