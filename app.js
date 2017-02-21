// Place app.js in folder with package.json
// TO RUN:
//    npm install
//    node app.js

var express     = require("express");
var parseUrl    = require('parseurl'); // necessary to see content of _parsedUrl property in req
var bodyParser  = require("body-parser");
var app         = express();
var util        = require("util");

var port = 3000;

// This parses the body sent via the post request as json
app.use(bodyParser.json());

function DebugPrintRoute(req, res) {
  // Show reply nicely in the Console
  //console.log("Request received: " + util.inspect(req, showHidden=false, depth=2, colorize=true))

  // Set our response to appear as json to client; This should be middleware in your code
  res.contentType('application/json');

  // a temporary object we will be using to inspect 
  var debug_reply = {};
  debug_reply.baseUrl = req.baseUrl;
  debug_reply.method = req.method;
  debug_reply.originalUrl = req.originalUrl;

  var parsedUrl = parseUrl(req); // equivalent to req._parsedUrl;
  debug_reply.rawPath = parsedUrl.pathname;
  debug_reply.rawQuery = parsedUrl.query;

  debug_reply.params = req.params;
  debug_reply.query = req.query;
  debug_reply.body = req.body;
  
  //util.inspect allows us to avoid the problem of recursive objects.
  console.log("REQUEST RECEIVED:\n" + util.inspect(debug_reply, showHidden=false, depth=2, colorize=false) + "\n\n");

  // print in the reply, also for easy debugging
  res.end( util.inspect(debug_reply, showHidden=false, depth=2, colorize=false) );
}

// Handle all requests, Post, Get, etc.
app.all('/', DebugPrintRoute);
app.all('/Users/:id', DebugPrintRoute);
app.all('*', DebugPrintRoute);

app.listen(port,function() {
  console.log("Started on PORT " + port);
})
