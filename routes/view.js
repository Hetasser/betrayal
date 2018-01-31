var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next) {
	res.render('index',{ title: 'users : ', values: req.body });
});


module.exports = router;
