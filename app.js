var express = require('express');

var app = express();

var mysql = require('mysql');
var connection = require('./db/db_connection');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

// set up the view engine as handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//require body parser to parse requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

/* Include and use routes*/
var routes = require('./routes/index');
app.use('/', routes);

//Error Handlers
//custom 404 page
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

//Custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render(500);
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + 
		app.get('port') + ' press Ctrl + c to terminate.')
})