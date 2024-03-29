var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var path = require('path');
var MongoDBStore = require('connect-mongodb-session')(expressSession);
var mongoStore = new MongoDBStore(
      { 
        uri: 'mongodb://localhost:27017/DataSec',
        collection: 'mySessions'
      });
var mongoose = require('mongoose');
require('./models/models.js');
require('jquery');
var app = express();
app.engine('.html', require('ejs').__express);
console.log('server dirname: ' + __dirname);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('view cache', false);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'SECRET',
    cookie: {maxAge: 60*1*10000},
    store: mongoStore, 
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.locals.moment = require('moment');
require('./routes.js')(app);
app.listen(80);
console.log('DataSec Server is running and listening to port 80...');
