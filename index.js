const express =     require('express'),
      app =         express(),
      bodyParser =  require('body-parser'),
      port =        process.env.PORT || 8080,
      slack =       require('./slack.js');

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('hello!');
});

app.listen(port, function() {
  console.log('running on http://localhost:' + port);
});
