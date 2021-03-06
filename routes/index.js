var express = require('express');
const Clase = require('../clase');
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

router.get('/:nombre', function(req, res) {
	let url = req.params.nombre;
	if(url === "favicon.ico") {
		res.status(204).send('');
	}
	else {
		connec();
		let sql1 = `SELECT * FROM clases WHERE nombre = ?`;
		let sql2 = `SELECT * FROM notas WHERE clase = ?`;
		var cl = new Clase.Clase();
		db.get(sql1, [req.params.nombre], (err, rows) => {
			if(err) {
				throw err;
			}
			cl.nombre = rows.nombre;
			db.all(sql2, [req.params.nombre], (err2, rows2) => {
				if(err2) {
					throw err2;
				}
				cl.notas = rows2;
				res.render('clase', {clase: cl});
			});
		});
		diss();
	}	
});

router.post('/', function(req, res, next) {
	connec();
	let sql = `INSERT INTO clases(nombre) VALUES(?)`;
	db.run(sql, [req.body.nombre], (err) => {
		if(err) {
			throw err;
		}
		res.redirect('/');
	})
	diss();
});

router.post('/:nombre', function(req, res, next) {
	connec();
	let sql = `INSERT INTO notas(nombre, porcentage, puntos, obtenida, clase) VALUES(?,?,0,0,?)`
	db.run(sql, [req.body.nombre, req.body.porcentage, req.params.nombre], (err) => {
		if(err) {
			throw err;
		}
		var url = '/'+req.params.nombre;
		res.redirect(url);
	})
	diss();
})

router.post('/:nombre/update', function(req, res, next) {
	connec();
	let sql = `UPDATE clases SET nombre = ? WHERE nombre = ?`;
	db.run(sql, [req.body.nombre, req.params.nombre], (err) => {
		if(err) {
			throw err;
		}
		res.redirect('/');
	})
	diss();
})

module.exports = router;
