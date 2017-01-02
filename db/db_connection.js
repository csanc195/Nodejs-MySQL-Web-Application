// This is the mysql connection block
var mysql = require("mysql");
// Create the connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Henry Books Store"
});

connection.connect(function(err) {
    if (!err){
    	console.log("Connection Successful!");
    } else{
    	console.log("Error while connecting to the database:" + err);
    }
});
module.exports = connection;



