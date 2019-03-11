class View {

	constructor(elemento) {

		this._elemento = elemento;
	}

	template(model) {
		throw new Error('O método template deve ser implementado.')
	}

	update(model) {
		console.log("update ativado");
		this._elemento.innerHTML = this.template(model);
	}

}