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

app.listen(3000, function () {
  console.log('Time server listening on port 3000!');
});