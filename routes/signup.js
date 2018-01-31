var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next) {
	res.render('Signup',{ title: 'Inscription : ', values: req.body });
});


module.exports = router;
