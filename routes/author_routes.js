var express = require('express');
var author_route = express.Router();
var mysql = require('mysql');
var connection = require('../db/db_connection');

/*************************** List **************************/
author_route.get("/author/list",function(req, res, next){
	connection.query('SELECT * FROM Author', function(err, rows, fields) {
		if (!err){
			return res.render('authorsresults', {result: rows, header: fields, title:'Author List'});
		}
		else{
		 	console.log('Error while performing Query.' + err);
			return res.render('genericerror', {title: 'Author Error', message: err});
	}});
});
/****************************************************************/
/*************************** Create  *************************/
author_route.post("/author/create",function(req, res, next){
	//DELETE FROM table_name [WHERE Clause]
	var authorNum = req.body.authorNum;
	var authorFirst = req.body.authorFirst;
	var authorLast = req.body.authorLast;

	if(authorNum == "" || authorFirst == "" || authorLast == ""){
		return res.render('genericerror', {title: 'Book Error', message: "Could not create author, all fields apply."});
	} else {
	var pstatement  = 'INSERT INTO Author (authorNum, authorLast, authorFirst) VALUES (?, ?, ?)';

		pstatement  = mysql.format(pstatement,[authorNum, authorLast, authorFirst] );

		connection.query(pstatement, function(err, rows, fields) {
			if (!err){
				return res.redirect("/author/list");
				console.log("Querry successfull!");
			}
			else{
			 	return res.render('genericerror', {title: 'Author Error', message: err});
		}});
	}
});
/****************************************************************/

/*************************** Delete  *************************/
author_route.post("/author/delete",function(req, res, next){
	var authorNum = req.body.authorNum;
	
	var pstatement  = "DELETE FROM `Author` WHERE authorNum = ?";
	pstatement  = mysql.format(pstatement , [authorNum]);

	connection.query(pstatement , function(err, rows, fields) {
		if (!err){
			return res.redirect("/author/list");
		}
		else{
		 	return res.render('genericerror', {title: 'Author Error', message: err});
	}});
});
/****************************************************************/
/*************************** Update  ****************************/
author_route.post("/author/update",function(req, res, next){
	var authorNum = req.body.authorNum;
	var authorLast = req.body.authorLast;
	var authorFirst = req.body.authorFirst;

	var pstatement;
	pstatement = "UPDATE Author SET authorLast = ?, authorFirst = ? WHERE authorNum = ?";
	pstatement  = mysql.format(pstatement , [authorLast, authorFirst, authorNum]);

	connection.query(pstatement , function(err, rows, fields) {
		if (!err){
			return res.redirect("/author/list");
		}
		else{
			return res.render('genericerror', {title: 'Author Error', message: err});
	}});
});
/****************************************************************/

module.exports = author_route;








