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

  // let requestTime = moment(new Date()).format('H:mm')
  // let timeString = req.body.text;
  // let momentObject = moment(timeString, 'H:mm a');
  // let momentString = momentObject.format('H:mm');
  // let countdown = moment(momentString, 'H:mm').fromNow('mm');

  let date = moment(new Date()).format('YYYY-MM-DD');
  let timeString = req.body.text;
  let momentObject = moment(timeString, 'H:mm a');
  let momentString = date + ' ' + momentObject.format('H:mm');

  const msToTime = (duration) => {
    let ms = parseInt((duration % 1000) / 100);
    let s = parseInt((duration / 1000) % 60);
    let m = parseInt((duration / (1000 * 60)) % 60);
    let h = parseInt((duration / (1000 * 60 * 60)) % 24);
  
    h = (h < 10) ? h : h;
    m = (m < 10) ? + m : m;
    s = (s < 10) ? + s : s;
  
    if (h === 0) {
      return '*' + m + '*\u000b' + 'm ' + '*' + s + '*\u000b' + 's';
    } else {
      return '*'+h+'*\u000b' + 'h ' + '*'+m+'*\u000b' + 'm ' + '*' + '*'+s+'*\u000b' + 's';
    }
  }

  const d1 = new Date();
  const d2 = new Date(momentString);
  const diff = Math.abs(d1 - d2);

  let countdown = '_' + timeString + '_' + ' is in ' + msToTime(diff);
  if (isNaN(diff)) {
    countdown = 'Please type time in this format— "12:00PM"';
  }

  const response = {
    statusCode: 200,
    response_type: 'in_channel',
    text: countdown
  }
  res.send(response);
});

// app.use(requestTime);

app.get('/', (req, res) => {

  let date = moment(new Date()).format('YYYY-MM-DD');
  let timeString = '11:20PM';
  let momentObject = moment(timeString, 'H:mm a');
  let momentString = date + ' ' + momentObject.format('H:mm');

  const msToTime = (duration) => {
    let milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  
      console.log(seconds + ' seconds');
      console.log(minutes + ' minutes');
      console.log(hours + ' hours');
  
    hours = (hours < 10) ? hours : hours;
    minutes = (minutes < 10) ? + minutes : minutes;
    seconds = (seconds < 10) ? + seconds : seconds;
  
    if (hours === 0) {
      return minutes + 'm ' + seconds + 's';
      console.log('hours = 0');
    } else {
      return hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
  }

  const d1 = new Date();
  const d2 = new Date(momentString);
  const diff = Math.abs(d1 - d2);
  console.log('diff: ', diff);

  let countdown = timeString + ' is in ' + msToTime(diff);
  if (isNaN(diff)) {
    countdown = 'Please type time in this format— "12:00PM"';
  }

  let responseText = {
    'response_type': 'in_channel',
    'text': countdown
  }
  res.send(responseText.text);  
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log('running on http://localhost:' + port);
});
