var express = require('express');
var publisher_route = express.Router();

var mysql = require('mysql');
var connection = require('../db/db_connection');

/*************************** Publisher ************************/
publisher_route.get("/publisher/list",function(req, res, next){
	connection.query('SELECT * FROM publisher', function(err, rows, fields) {
		if (!err){
		 	//console.log('The solution is: ', rows);
			return res.render('publishersresults', {result: rows, header: fields, title:'Publisher List'});
		}
		else{
		 	console.log('Error while performing Query.' + err);
			return res.render('404', {title: 'Resource Not Found'});
	}});
});
/*************************************************************/

/*************************** Create  *************************/
publisher_route.post("/publisher/create",function(req, res, next){

	var publisherCode = req.body.publisherCode;
	var publisherName = req.body.publisherName;
	var city = req.body.city;

	//verify that front end is sending right data
	console.log("Book Code:", publisherCode);
	console.log("Branch Number:", publisherName);
	console.log("Copy Number:", city);


	if(publisherCode == "" || publisherName == "" || city == ""){
		return res.render('genericerror', {title: 'Book Error', message: "Could not create publisher, all fields apply."});
	} else {
		var pstatement  = 'INSERT INTO Publisher (publisherCode, publisherName, city) VALUES (?, ?, ?)';
		pstatement  = mysql.format(pstatement,[publisherCode, publisherName, city] );
		connection.query(pstatement, function(err, rows, fields) {
			console.log(pstatement);
			if (!err){
				return res.redirect("/publisher/list");
				console.log("Querry successfull!");
			}
			else{
			 	console.log('Error while performing Query.' + err);
			 	console.log("Querry: " + pstatement);
				return res.render('genericerror', {title: 'Book Error', message: err});
		}});
	}
});
/****************************************************************/

/*************************** Delete  *************************/
publisher_route.post("/publisher/delete",function(req, res, next){
	var publisherCode = req.body.publisherCode;
	var publisherName = req.body.publisherName;
	var city = req.body.city;

	//verify that front end is sending right data
	console.log("Book Code:", publisherCode);
	console.log("Branch Number:", publisherName);
	console.log("Copy Number:", city);
	
	var pstatement  = "DELETE FROM `Publisher` WHERE publisherCode = ?";
	pstatement  = mysql.format(pstatement , [publisherCode]);

	connection.query(pstatement , function(err, rows, fields) {
		if (!err){
			// console.log("Reccord Deleted");
			//console.log("Querry: " + pstatement);
			return res.redirect("/publisher/list");
		}
		else{
		 	console.log('Error while performing Query.' + err);
			return res.render('genericerror', {title: 'Book Error', message: err});
	}});
});
/****************************************************************/

/*************************** Update  ****************************/
publisher_route.post("/publisher/update",function(req, res, next){
	
	var publisherCode = req.body.publisherCode;
	var publisherName = req.body.publisherName;
	var city = req.body.city;

	//verify that front end is sending right data
	console.log("Book Code:", publisherCode);
	console.log("Branch Number:", publisherName);
	console.log("Copy Number:", city);

	var pstatement;
	pstatement = "UPDATE Publisher SET publisherName = ?, city = ? WHERE publisherCode = ?";
	pstatement  = mysql.format(pstatement , [publisherName, city, publisherCode]);

	connection.query(pstatement , function(err, rows, fields) {
		if (!err){
			// console.log("Reccord Updated");
			console.log("Querry: " + pstatement);
			return res.redirect("/publisher/list");
		}
		else{
		 	// console.log('Error while performing Query.' + err);
		 	// console.log("My querry is: " + pstatement);
			return res.render('genericerror', {title: 'Book Error', message: err});
	}});
});
/****************************************************************/




module.exports = publisher_route;














