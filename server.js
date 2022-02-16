const http = require('http');
const service = require('./service');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000; //for deploying on heroku 
//const port = process.env.NODE_PORT // for testing on local host

const server = http.createServer(service);


server.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});