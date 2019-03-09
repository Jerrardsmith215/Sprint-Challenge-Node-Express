// initialize server and routes
const express = require('express');
const server = express();
const projects = require('./data/routers/projects');
const actions = require('./data/routers/actions');

// server variables and middleware
const port = 9090; 
const parser = express.json();

const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

server.use(
    parser,
    logger('tiny'),
    helmet(), 
    cors(),
    );

// define routes and activate server
server.use('/api/projects', projects);
server.use('/api/actions', actions);

server.listen(port, () => {
    console.log(`Server Started on port ${port}`); 
});