var express = require('express');
var app = express();

app.get('/', function(req,res) {
    res.send("<h1>hi</h1>")
})

app.listen(3000, function() {
    console.log("start! express server on port 3000")
})