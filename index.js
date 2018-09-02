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

  let responseText = 'BOINNG! BOINNG!"\n"The current time is: ' + formatTime(new Date()) + '!';
  res.send(responseText);
  res.sendStatus(200);
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

  let responseText = '(GET)BOINNG! BOINNG!"\n"The current time is: ' + formatTime(new Date()) + '!';
  res.send(responseText);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log('running on http://localhost:' + port);
});
