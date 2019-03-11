class NegociacaoService {

	constructor() {

		this.http = new HttpService();
	}

    obter(url) {

        return new Promise((resolve, reject) => this.http
        	.get(url)
        	.then( negociacoes => {
        		resolve(negociacoes.map( json => 
        			new Negociacao(new Date(json.data), json.quantidade, json.valor)))
        	})
        	.catch( error => {
        		console.log(error);
        		reject(`Não foi possivel obter negociações da url: ${url}`);
        	})
        );
    }
}