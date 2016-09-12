var express = require('express');
var app = express();

function zeroFill(i) {
    return (i < 10 ? '0' : '') + i;
}

function now() {
    var d = new Date();
    return d.toString();
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send(now());
});

app.get('/health', function(req, res) {
  res.status(200).json({status:"ok"});
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