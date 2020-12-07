import Nota from './nota'

export class Clase {
	constructor(nombre) {
		this.nombre = nombre;
		this.notas = [];
	}

	addNota(nota) {
		this.notas.push(nota);
	}

	deleteNota(nota) {
		delete nota;
	}
}
