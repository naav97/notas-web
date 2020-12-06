const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./Notas.db', (err) => {
	if (err) {
		console.error(err.message)
	}
	console.log('Conectado a la base de datos')
})

function getMaterias() {
	let sql = `SELECT * FROM Clases`
	db.all(sql, [], (err, rows) => {
		if(err) {
			throw err
		}
		return rows
	})
}

module.exports = getMaterias
