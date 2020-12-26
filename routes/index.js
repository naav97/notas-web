var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

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

function connec() {
	db = new sqlite3.Database('./notas.db', (err) => {
		if(err) {
			console.error(err.message)
		}
		console.log('Conectado a la db')
	})
}

function diss() {
	db.close((err) => {
		if(err) {
			console.error(err.message)
		}
		console.log('Desconectado de la db')
	})	
}

/* GET home page. */
router.get('/', function(req, res, next) {
	connec();
	let sql = `SELECT * FROM clases`;
	db.all(sql, [], (err, rows) => { 
		if(err) {
			throw err;
		}
		res.render('index', { title: "Notas Web", clases: rows});
	});
	diss();
});

router.get('/:nombre', function(req, res, next) {
	const cl = clases.filter(clase => clase.nombre === req.params.nombre);
	//res.json(cl[0])
	res.render('clase', {clase: cl[0]});
});

router.post('/', function(req, res, next) {
	const newClase = {
		nombre: req.body.nombre,
		notas: []
	}
	clases.push(newClase);
	res.redirect('/');
});

router.post('/:nombre', function(req, res, next) {
	const clase = clases.filter(clase => clase.nombre === req.params.nombre);
	//console.log(clase)
	const newNota = {
		nombre: req.body.nombre,
		porcentage: req.body.porcentage,
		puntos: 0,
		obtenida: false
	}
	clase[0].notas.push(newNota);
	var url = '/'+clase[0].nombre
	res.redirect(url);
})

router.post('/:nombre/update', function(req, res, next) {
	const upClass = req.body;
	const clase = clases.filter(clase => clase.nombre === req.params.nombre);
	clase.nombre = upClass.nombre ? upClass.nombre : clase.nombre;
	res.redirect('/');
})

module.exports = router;
