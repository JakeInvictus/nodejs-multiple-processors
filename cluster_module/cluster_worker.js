//implements the worker HTTP servers
var cluster = require('cluster');
var http = require('http');
if (cluster.isWorker) {
  http.Server(function (req, res) {
  	res.writeHead(200);
  	// the HTTP server sends back a response to the client
  	res.end("Process " + process.pid + " says hello");
  	// and then also sends a message to the cluster master
  	process.send("Process " + process.pid + " handled request");
  }).listen(8080, function () {
  	console.log("Child Server Running on Process: " + process.pid);
  });
}