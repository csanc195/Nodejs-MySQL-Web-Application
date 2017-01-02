var express = require('express');
var router = express.Router();

var fortune = require('../libs/fortune.js');
var results;


/* Include and use all the required routes*/
var login_routes = require("./login_routes");
router.use('/', login_routes);

var home_routes = require('./home_routes');
router.use('/', home_routes);

var book_routes = require('./book_routes');
router.use('/', book_routes);

var publisher_routes = require('./publisher_routes');
router.use('/', publisher_routes);

var author_routes = require('./author_routes');
router.use('/', author_routes);

var copy_routes = require('./copy_routes');
router.use('/', copy_routes);

/* GET the about page */
router.get('/about', function(req, res){
	return res.render('about', { fortune: fortune.getFortune(), title: "About"});
});




module.exports = router;




