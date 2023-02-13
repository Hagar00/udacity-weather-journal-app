// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

/* Middleware*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// const { response, request } = require("express");

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
// call back function get 
const getAll = (request, response)=> response.status(200).send(projectData);

// get route
app.get("/all", getAll);

// callback function post 
const postData = (request, response)=>{
    projectData = request.body;
    response.status(200).send(projectData);
}

app.post("/add",postData);
const port = 4000;
const hostname = "127.0.0.1";

// function test server 
const listening = ()=> 
console.log(`server running at https://${hostname}:${port}`);
app.listen(port, listening);