const Nota = require('./nota')

class Clase {
	constructor(nombre) {
		this.nombre = nombre;
		this.notas = [];
	}

	addNota(nota) {
		this.notas.push(nota);
	}

	deleteNota(nota) {
		for(var i = 0; i < this.notas.length; i++){
			if(this.notas[i] === nota){
				this.notas.splice(i,1)
			}
		}
	}
}

module.exports.Clase = Clase
