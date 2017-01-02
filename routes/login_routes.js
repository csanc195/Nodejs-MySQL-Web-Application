var express = require('express');
var login_route = express.Router();

var mysql = require('mysql');
var connection = require('../db/db_connection');

login_route.get("/login", function(req, res, next){
	return res.render("login");
});



module.exports = login_route;