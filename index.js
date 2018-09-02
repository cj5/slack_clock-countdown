const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const slack = require('./slack.js');

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());

const requestTime = (req, res, next) => {
  req.requestTime = new Date();
  next();
}

app.post('/', function(req, res) {
  let responseText = '<b>(POST)Requested: </b>' + req.requestTime;
  res.send(responseText);
  res.sendStatus(200);
});

app.use(requestTime);

app.get('/', (req, res) => {
  let responseText = '<b>(GET)Requested: </b>' + req.requestTime;
  res.send('GET response');
  res.sendStatus(200);
});

// app.get('/', function(req, res) {
// 	res.send('app.get');
// });

app.listen(port, () => {
  console.log('running on http://localhost:' + port);
});
