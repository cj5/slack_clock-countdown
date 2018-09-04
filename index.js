const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const moment = require('moment');

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'true'}));

app.post('/', (req, res) => {

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
  
    if (h === 0 && m !== 0) {
      return '*'+m+'*\u200a' + 'm & ' + '*'+s+'*\u200a' + 's' + ' :hourglass_flowing_sand:';
    } else if (h === 0 && m === 0) {
      return '*'+s+'*\u200a' + 's' + ' :hourglass_flowing_sand:';
    } else {
      return '*'+h+'*\u200a' + 'h, ' + '*'+m+'*\u200a' + 'm & ' + '*'+s+'*\u200a' + 's' + ' :hourglass_flowing_sand:';
    }
  }

  const d1 = new Date();
  const d2 = new Date(momentString);
  const diff = Math.abs(d1 - d2);

  let countdown = '_' + timeString + '_' + ' is in— ' + msToTime(diff);
  if (isNaN(diff)) {
    countdown = ':no_entry_sign: ' + '_' + req.body.text + '_ is an invalid command. Please type a time in this format— "12:00pm"';
  }

  const response = {
    statusCode: 200,
    response_type: 'in_channel',
    text: countdown
  }
  res.send(response);
});

app.get('/', (req, res) => {
  res.send('slack_clock-countdown');  
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log('running on http://localhost:' + port);
});
