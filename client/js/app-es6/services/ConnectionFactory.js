const stores = ['negociacao'];
const version = 4;
const dbName = 'aluraframe';
let connection = null;
let close = null;

export class ConnectionFactory {

    constructor() {

        throw new Error("Não é possivel criar instancias");
    }

    static getConnection() {

        return new Promise((resolve, reject) => {
            var openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {

                console.log("Cria ou altera um banco já existente");
                ConnectionFactory._createStore(e.target.result);
            }

            openRequest.onsuccess = e => {

                console.log("Conexão obtida com sucesso");
                if (!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function() {
                        throw new Error("fechamento direto não disponivel")
                    }
                }
                resolve(connection);
            }

            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            }
        });
    }

    static _createStore(connection) {

        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store, { autoIncrement: true });
        });
    }

    static closeConnection(connection) {

        if (!connection) {

            close()
            connection = null;
        }
    }
}