var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next) {
	res.render('world',{ title: 'world : ', values: req.body });
});


module.exports = router;