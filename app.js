var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');

// Configure.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// Home Route.
app.get('/', function (req, res) {
  res.render('index.html');
});

// Use Express Router for api routes.
app.use('/api', router);
require('./server/api')(router);

app.listen(3000);
console.log('Listening on port 3000');
