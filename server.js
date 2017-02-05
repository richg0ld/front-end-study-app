const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var result = [];

app.get('/api/data', function(req, res){
  res.send(result);
});

app.post('/api/data', function(req, res){
  result.push(req.body.name);
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

