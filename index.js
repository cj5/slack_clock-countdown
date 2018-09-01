const express =     require('express'),
      app =         express(),
      bodyParser =  require('body-parser'),
      port =        process.env.PORT || 8080,
      slack =       require('./slack.js');
