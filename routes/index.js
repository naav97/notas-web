var express = require('express');
var router = express.Router();
var clase = require('../clase');

var clases = [
	{
		"nombre":"Calculo",
		"notas":[]
	},
	{
		"nombre":"Fisica",
		"notas":[]
	},
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Notas Web', clases: clases });
});

module.exports = router;
