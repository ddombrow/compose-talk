var express = require('express');
var app = express();

var Forecast = require('forecast');
 
// Initialize 
var forecast = new Forecast({
  service: 'forecast.io',
  key: 'd0c82c7f5fe3fda9710bf313800dee41',
  units: 'f', // Only the first letter is parsed 
  cache: true,      // Cache API requests? 
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
    minutes: 27,
    seconds: 45
  }
});
 


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  	// Retrieve weather information from coordinates (Sydney, Australia) 
	forecast.get([38.889469, -77.035258], function(err, weather) {
	  if(err) return console.dir(err);
	  console.dir(weather);
	  res.send(weather.currently.summary);
	});
});

app.listen(3001, function () {
  console.log('Weather server listening on port 3001!');
});