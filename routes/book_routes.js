var express = require('express');
var books_route = express.Router();

var mysql = require('mysql');
var connection = require('../db/db_connection');

/************************* Books ***************************/
books_route.get("/book/list",function(req, res, next){
	connection.query('SELECT * FROM Book', function(err, rows, fields) {
		if (!err){
			return res.render('booksresults', {result: rows, header: fields, title:'Book List'});
		}
		else{
		 	console.log('Error while performing Query.' + err);
			return res.render('genericerror', {title: 'Book Error', message: err});
	}});
});
/*************************************************************/

/*************************** Create  *************************/
books_route.post("/book/create",function(req, res, next){
	//DELETE FROM table_name [WHERE Clause]
	var bookCode = req.body.bookCode;
	var title = req.body.title;
	var publisherCode = req.body.publisherCode;
	var type = req.body.type;
	var paperback = req.body.paperback;

	if(bookCode == "" || title == "" || publisherCode == "" || type =="" || paperback ==""){
		return res.render('genericerror', {title: 'Book Error', message: "Could not create book, all fields apply."});
	} else {
	var pstatement  = 'INSERT INTO Book (bookCode, title, publisherCode, type, paperback) VALUES (?, ?, ?, ?, ?)';
	pstatement  = mysql.format(pstatement,[bookCode, title, publisherCode, type, paperback] );
		connection.query(pstatement, function(err, rows, fields) {
			if (!err){
				return res.redirect("/book/list");
				console.log("Querry successfull!");
			}
			else{
			 	console.log('Error while performing Query.' + err);
				return res.render('genericerror', {title: 'Book Error', message: err});
		}});
	}
});
/****************************************************************/
/*************************** Delete  *************************/
books_route.post("/book/delete",function(req, res, next){
	var bookCode = req.body.bookCode;
	var title = req.body.title;
	var publisherCode = req.body.publisherCode;
	var type = req.body.type;
	var paperback = req.body.paperback;

	console.log("Book Code:", bookCode);
	console.log("Title:", title);
	console.log("Publisher Code:", publisherCode);
	console.log("Type:", type);
	console.log("Paperback:", paperback);
	
	var pstatement  = "DELETE FROM `Book` WHERE bookCode = ?";
	pstatement  = mysql.format(pstatement , [bookCode]);

	connection.query(pstatement , function(err, rows, fields) {
		if (!err){
			// console.log("Reccord Deleted");
			console.log("Querry: " + pstatement);
			return res.redirect("/author/list");
		}
		else{
		 	console.log('Error while performing Query.' + err);
		 	return res.render('genericerror', {title: 'Book Error', message: err});
	}});
});
/****************************************************************/

/*************************** Update  ****************************/
books_route.post("/book/update",function(req, res, next){
	
	var bookCode = req.body.bookCode;
	var title = req.body.title;
	var publisherCode = req.body.publisherCode;
	var type = req.body.type;
	var paperback = req.body.paperback;

	console.log("Book Code:", bookCode);
	console.log("Title:", title);
	console.log("Publisher Code:", publisherCode);
	console.log("Type:", type);
	console.log("Paperback:", paperback);

	var pstatement;
	pstatement = "UPDATE Book SET title = ?, publisherCode = ?, type = ?, paperback = ? WHERE bookCode = ?";
	pstatement  = mysql.format(pstatement , [title, publisherCode, type, paperback, bookCode]);

	connection.query(pstatement , function(err, rows, fields) {
		if (!err){
			// console.log("Reccord Updated");
			// console.log("Querry: " + pstatement);
			return res.redirect("/book/list");
		}
		else{
		 	// console.log('Error while performing Query.' + err);
		 	// console.log("My querry is: " + pstatement);
			return res.render('genericerror', {title: 'Book Error', message: err});
	}});
});
/****************************************************************/
books_route.get("/book/search", function(req, res, next){
	return res.render("searchbooks", {title: "Search Books"});
});
/*************************** Update  ****************************/
books_route.post("/book/find",function(req, res, next){

	var title = req.body.title;
	title = "'%"+title+"%'";

	var pstatement;
	pstatement = "SELECT d.title, d.bookCode AS code, Author.authorFirst, Author.authorLast , d.publisherName, d.publisherCode AS pCode, d.branchName AS branch, d.BranchLocation AS blocation, d.city, d.onHand\n"
+" FROM \n"
+"(SELECT c.title, c.bookCode, c.publisherCode, c.onHand, c.branchName, c.BranchLocation, c.publisherName, c.city, Wrote.authorNum\n"
+" FROM \n"
	+" (SELECT b.title, b.bookCode, b.publisherCode, b.onHand, b.branchName, b.BranchLocation, Publisher.publisherName, Publisher.city\n"
	+" FROM\n"
		+" (SELECT a.title, a.bookCode, a.publisherCode, a.OnHand, Branch.branchName, Branch.branchLocation\n"
		+" FROM\n"
			+" (SELECT Book.title, Book.bookCode, Book.publisherCode, Inventory.OnHand, Inventory.BranchNum\n"
			+" FROM Book\n"
            +" JOIN Inventory\n"
            +" ON Book.bookCode=Inventory.BookCode\n"
            +" WHERE title LIKE" + title + ") AS a\n"
            +" JOIN Branch\n"
            +" ON a.branchNum = Branch.branchNum) AS b\n"
            +" JOIN Publisher\n"
            +" ON b.publisherCode = Publisher.publisherCode) AS c\n"
+" JOIN Wrote\n"
+" ON c.bookCode = Wrote.bookCode) AS d\n"
+" JOIN Author"
+" ON d.authorNum = Author.authorNum\n";

	
	connection.query(pstatement , function(err, rows, fields) {

		console.log("Title is: "+title);
		if (!err){
			//res.json(rows);
			return res.render("searchbooks", {title: "Book List", result: rows, header: fields});
			}

		else{
		 	console.log('Error while performing Query.' + err);
		 	console.log("My querry is: " + pstatement);
			return res.render('genericerror', {title: 'Book Error', message: err});
	}});
});
/****************************************************************/
module.exports = books_route;














