var http = require("http");
require("dotenv").config();
const app = require("./app");
//create a server object:
http.createServer(app).listen(8080); //the server object listens on port 8080
