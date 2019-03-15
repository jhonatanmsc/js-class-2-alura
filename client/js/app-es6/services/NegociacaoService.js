import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';

export class NegociacaoService {

	constructor() {

		this.http = new HttpService();
	}

    obter(url) {

        return new Promise((resolve, reject) => this.http
        	.get(url)
        	.then( negociacoes => {
        		resolve(negociacoes.map( json => {
                    console.log(json.quantidade);
                    let n = new Negociacao(new Date(json._data), json._quantidade, json._valor)
        			console.log(n);
                    return n;
                }))
        	})
        	.catch( error => {
        		console.log(error);
        		reject(`Não foi possivel obter negociações da url: ${url}`);
        	})
        );
    }

    cadastra(negociacao) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(()=> 'Negociação adicionada.')
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possivel adicionar a negociação')
             });
    }

    lista() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.listarTodos())
            .catch(err => {
                console.log(err);
                throw new Error("Não foi possivel listar negociações");
            })
    }

    apaga() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodos())
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    importa(negociacaoList) {
        
        return Promise.all([
            this.obter('negociacoes/semana'),
            //this.obter('negociacoes/anterior'),
            //this.obter('negociacoes/retrasada'),
            this.lista()
            ])
            .then( negociacoes => {
                console.log(negociacoes);
                return negociacoes
                    .reduce( (arrayAchatado, array) => 
                        arrayAchatado.concat(array), [])
                    .filter( negociacao => 
                        !negociacaoList.some( f => 
                        JSON.stringify(negociacao) == JSON.stringify(f)))
            })
    }
}