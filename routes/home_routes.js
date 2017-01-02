var express = require('express');
var home_route = express.Router();

var mysql = require('mysql');
var connection = require('../db/db_connection');

/* GET Home page*/
home_route.get('/', function(req, res, next){
	connection.query('SHOW TABLES', function(err, rows){
		if(!err){
			//console.log(rows);
			return res.render('home', {title: "Home", database_name: rows});
		} else{
			return res.render('404', {title: 'No Data Found'});
		}
	});
});

module.exports = home_route;