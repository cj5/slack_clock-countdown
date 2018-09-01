const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const slack = require('./slack.js');

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());

app.post('/', function(req, res) {
  res.sendStatus('post test');
	res.sendStatus(200);
});

const requestTime = (req, res, next) => {
  req.requestTime = new Date();
  next();
}

app.use(requestTime);

app.get('/', (req, res) => {
  let responseText = '<b>Requested at: </b>' + req.requestTime;
  res.send(responseText);
});

// app.get('/', function(req, res) {
// 	res.send('app.get');
// });

app.listen(port, () => {
  console.log('running on http://localhost:' + port);
});
