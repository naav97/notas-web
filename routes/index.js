var express = require('express');
var router = express.Router();
var clase = require('../clase');

var clases = [
	{
		"nombre":"Calculo",
		"notas":[
			{
				"nombre":"Parcial1",
				"porcentage":20,
				"puntos":0,
				"obtenida":false,
			},
			{
				"nombre":"Parcial2",
				"porcentage":20,
				"puntos":0,
				"obtenida":false,
			}
		]
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

router.get('/:nombre', function(req, res, next) {
	const cl = clases.filter(clase => clase.nombre === req.params.nombre);
	//res.json(cl[0])
	res.render('clase', {clase: cl[0]});
});

module.exports = router;
