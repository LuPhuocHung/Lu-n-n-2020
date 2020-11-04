// Define dependence

const http = require('http');
const app = require('./app');

// define port 
const port = process.env.PORT || 8080;

// create a server 
const server = http.createServer(app);

// listen a port
server.listen(port,() => console.log('Server is running ',port));