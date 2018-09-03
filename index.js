const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const slack = require('./slack.js');

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({'extended': 'true'}));

const requestTime = (req, res, next) => {
  req.requestTime = new Date();
  next();
}

app.post('/', (req, res) => {
  const formatTime = (date) => {
    let hours = date.getHours(),
    minutes = date.getMinutes(),
    ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
  
    return strTime;
  }

  const time = formatTime(new Date());

  const response = {
    statusCode: 200,
    response_type: 'in_channel',
    text: '_{ math }_ hours and _{ math }_ minutes until ' + req.body.text + '\n\n' + JSON.stringify(req.body)
    // JSON.stringify(req.body)
    // text: 'BOINNG! BOINNG!\nThe current time is: ' + formatTime(new Date()) + '!',
  }
  res.send(response);
  // res.sendStatus(200);
});

app.use(requestTime);

app.get('/', (req, res) => {
  function formatTime(date) {
    let hours = date.getHours(),
    minutes = date.getMinutes(),
    ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
  
    return strTime;
  }

  let responseText = {
    'response_type': 'in_channel',
    // 'text': '(GET)BOINNG! BOINNG!\nThe current time is: ' + formatTime(new Date()) + '!'
    'text': req.body.action
  }
  res.send(responseText.text);  
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log('running on http://localhost:' + port);
});
