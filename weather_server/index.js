require('dotenv').config();
var express = require('express');
var app = express();
var redis = require("redis"),
    client = redis.createClient({
      host: process.env.REDIS_HOST
    });

client.on("error", function (err) {
    console.log("Error " + err);
});

var Forecast = require('forecast');
 
// Initialize 
var forecast = new Forecast({
  service: 'forecast.io',
  key: process.env.FORECAST_KEY,
  units: 'f', // Only the first letter is parsed 
  cache: true,      // Cache API requests? 
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
    minutes: 27,
    seconds: 45
  }
});

app.get('/', function(req, res) {
  	// Retrieve weather information from coordinates (Sydney, Australia) 
    client.get("current:dc:weather", function(err, reply) {
      if (err) {
        res.status(500).send("Couldn't get the weather!");
      }
      else {
        res.json(JSON.parse(reply));
      }
    });
});

app.get('/health', function(req, res) {
  client.ping(function (err, result) {
     if (err) {
       res.status(500);
       res.end();
     }
     else {
        if (result == "PONG") {
          res.status(200).json({status:"ok"});
        }
     }
  });
});

///OMG TAKES SO LONG TO INITIALIZE
setTimeout(function() {
   app.listen(3001, function () {
    console.log('Weather server listening on port 3001!');
  });
}, randInt(1000,5000));

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDcWeather(cb) {
  forecast.get([38.889469, -77.035258], function(err, weather) {
	  if(err) {
      return cb(err);
    }
	  console.dir(weather.currently);
	  cb(null, weather.currently);
	});
}

client.set("current:dc:weather", JSON.stringify({}));
var weatherInterval = setInterval(function() {
  getDcWeather(function(err, data) {
    if (err) {
      console.error("Couldn't get the weather from forecast.");
    }
    else {
      client.set("current:dc:weather", JSON.stringify(data));
    }
  });
}, 5000);