var express = require('express');
var copy_route = express.Router();

var mysql = require('mysql');
var connection = require('../db/db_connection');


/*************************** List ************************/
copy_route.get("/copy/list",function(req, res, next){
	connection.query('SELECT * FROM copy', function(err, rows, fields) {
		if (!err){
		 	//console.log('The solution is: ', rows);
			return res.render('copyresults', {result: rows, header: fields, title:'Copy List'});
		}
		else{
		 	console.log('Error while performing Query.' + err);
			return res.render('genericerror', {title: 'Book Error', message: err});
	}});
});
/**************************************************************/

/*************************** Create  *************************/
copy_route.post("/copy/create",function(req, res, next){
	var bookCode = req.body.bookCode;
	var branchNum = req.body.branchNum;
	var copyNum = req.body.copyNum;
	var quality = req.body.quality;
	var price = req.body.price;

	console.log("Book Code:", bookCode);
	console.log("Branch Number:", branchNum);
	console.log("Copy Number:", copyNum);
	console.log("Quality:", quality);
	console.log("Price:", price);

	if(bookCode == "" || branchNum == "" || copyNum == "" || quality =="" || price ==""){
		return res.render('genericerror', {title: 'Book Error', message: "Could not create copy, all fields apply."});
	} else {

		var pstatement  = 'INSERT INTO Copy (bookCode, branchNum, copyNum, quality, price) VALUES (?, ?, ?, ?, ?)';
		pstatement  = mysql.format(pstatement,[bookCode, branchNum, copyNum, quality, price]);
		connection.query(pstatement, function(err, rows, fields) {
			console.log(pstatement);
			if (!err){
				return res.redirect("/copy/list");
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
copy_route.post("/copy/delete",function(req, res, next){
	var bookCode = req.body.bookCode;
	var branchNum = req.body.branchNum;
	var copyNum = req.body.copyNum;
	var quality = req.body.quality;
	var price = req.body.price;

	console.log("Book Code:", bookCode);
	console.log("Branch Number:", branchNum);
	console.log("Copy Number:", copyNum);
	console.log("Quality:", quality);
	console.log("Price:", price);
	
	var pstatement  = "DELETE FROM `Copy` WHERE bookCode = ?";
	pstatement  = mysql.format(pstatement , [bookCode]);

	connection.query(pstatement , function(err, rows, fields) {
		if (!err){
			// console.log("Reccord Deleted");
			//console.log("Querry: " + pstatement);
			return res.redirect("/copy/list");
		}
		else{
		 	console.log('Error while performing Query.' + err);
		 	console.log("Querry: " + pstatement);
			return res.render('genericerror', {title: 'Book Error', message: err});
	}});
});
/****************************************************************/

/*************************** Update  ****************************/
copy_route.post("/copy/update",function(req, res, next){
	
	var bookCode = req.body.bookCode;
	var branchNum = req.body.branchNum;
	var copyNum = req.body.copyNum;
	var quality = req.body.quality;
	var price = req.body.price;

	console.log("Back end prints");
	console.log("Book Code:", bookCode);
	console.log("Branch Number:", branchNum);
	console.log("Copy Number:", copyNum);
	console.log("Quality:", quality);
	console.log("Price:", price);

	var pstatement;
	pstatement = "UPDATE Copy SET  quality = ?, price = ? WHERE bookCode = ? AND branchNum = ? AND copyNum = ?";
	pstatement  = mysql.format(pstatement , [quality, price, bookCode, branchNum, copyNum]);

	connection.query(pstatement , function(err, rows, fields) {
		if (!err){
			// console.log("Reccord Updated");
			console.log("Querry: " + pstatement);
			return res.redirect("/copy/list");
		}
		else{
		 	// console.log('Error while performing Query.' + err);
		 	// console.log("My querry is: " + pstatement);
			return res.render('genericerror', {title: 'Book Error', message: err});
	}});
});
/****************************************************************/





module.exports = copy_route;





























