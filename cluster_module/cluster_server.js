var cluster = require('cluster');
var http = require('http');
if (cluster.isMaster) {
  //register listeners for the fork, listening and exit events on cluster workers
  cluster.on('fork', function (worker) {
  	console.log("Worker " + worker.id + " created");
  });
  cluster.on('listening', function (worker, address) {
  	console.log("Worker " + worker.id + " is listening on " + address.address + ":" + address.port);
  });
  cluster.on('exit', function (worker, code, signal) {
  	console.log("Worker " + worker.id + " Exited");
  });
  //specifies the worker executable cluster_worker.js
  cluster.setupMaster({exec: 'cluster_worker.js'});
  //create the workers by calling cluster.fork()
  var numCPUs = require('os').cpus().length;
  for (var i=0; i<numCPUs; i++) {
    if (i>=4) break;
    cluster.fork();	
  }
  //iterates through the workers and registers an on('message') event handler for each one.
  Object.keys(cluster.workers).forEach(function (id) {
  	cluster.workers[id].on('message', function (message) {
  	  console.log(message);
  	});
  });
}