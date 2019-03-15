import { Negociacao } from '../models/Negociacao';

export class NegociacaoDAO {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacao';
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction((this._store), 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject("Não foi possivel adicionar a negociação");
            };
        });
    }

    listarTodos() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction((this._store), 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacaoList = [];

            cursor.onsuccess = e => {

                let atual = e.target.result;
                if (atual) {
                    let dado = atual.value;

                    negociacaoList.push(
                        new Negociacao(dado._data, dado._quantidade, dado._valor));

                    atual.continue();

                } else {

                    resolve(negociacaoList)
                }
            }

            cursor.onerror = e => {

                console.log(e.target.error);
                reject("Não foi possivel listar negociações.");
            }
        });
    }

    apagaTodos() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction((this._store), 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve("Negociações removidas");
            request.onerror = e => reject("Não foi possivel remover negociações")
        });
    }
}