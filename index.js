const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const slack = require('./slack.js');
const moment = require('moment');

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'true'}));

// const requestTime = (req, res, next) => {
//   req.requestTime = new Date();
//   next();
// }

app.post('/', (req, res) => {

  let requestTime = moment(new Date()).format('H:mm')
  let timeString = req.body.text;
  let momentObject = moment(timeString, 'H:mm a');
  let momentString = momentObject.format('H:mm');
  let countdown = moment(momentString, 'H:mm').fromNow('mm');

  const response = {
    statusCode: 200,
    response_type: 'in_channel',
    text: 'There\'s *' + countdown + '* until *' + timeString + '*!'
  }
  res.send(response);
});

// app.use(requestTime);

app.get('/', (req, res) => {

  let requestTime = moment(new Date()).format('H:mm')
  let timeString = '6:00 pm';
  let momentObject = moment(timeString, 'H:mm a');
  let momentString = momentObject.format('H:mm');
  let countdown = moment(momentString, 'H:mm').fromNow('mm');

  let responseText = {
    'response_type': 'in_channel',
    'text': 'There\'s ' + countdown + ' until ' + timeString + '!'
  }
  res.send(responseText.text);  
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log('running on http://localhost:' + port);
});
