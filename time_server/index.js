var express = require('express');
var app = express();
var redis = require("redis"),
    client = redis.createClient({
      host: process.env.REDIS_HOST
    });

client.on("error", function (err) {
    console.log("Error " + err);
});


function zeroFill(i) {
    return (i < 10 ? '0' : '') + i;
}

function now() {
    var d = new Date();
    return d.toString();
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  client.get("current:dc:time", function(err, reply) {
      if (err) {
        res.status(500).send("Couldn't get the time!");
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
  app.listen(3000, function () {
    console.log('Time server listening on port 3000!');
  });
}, randInt(1000, 5000));

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.set("current:dc:time", JSON.stringify({}));
var timeInterval = setInterval(function() {
  const now = new Date();
  console.log("current time:", now);
  client.set("current:dc:time", JSON.stringify(now));
}, 5000);