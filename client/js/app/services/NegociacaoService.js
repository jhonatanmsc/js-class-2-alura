'use strict';

System.register(['./HttpService', './ConnectionFactory'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this.http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'obter',
                    value: function obter(url) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            return _this.http.get(url).then(function (negociacoes) {
                                resolve(negociacoes.map(function (json) {
                                    console.log(json.quantidade);
                                    var n = new Negociacao(new Date(json._data), json._quantidade, json._valor);
                                    console.log(n);
                                    return n;
                                }));
                            }).catch(function (error) {
                                console.log(error);
                                reject('N\xE3o foi possivel obter negocia\xE7\xF5es da url: ' + url);
                            });
                        });
                    }
                }, {
                    key: 'cadastra',
                    value: function cadastra(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return 'Negociação adicionada.';
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possivel adicionar a negociação');
                        });
                    }
                }, {
                    key: 'lista',
                    value: function lista() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.listarTodos();
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error("Não foi possivel listar negociações");
                        });
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.apagaTodos();
                        }).catch(function (err) {
                            console.log(err);
                            return err;
                        });
                    }
                }, {
                    key: 'importa',
                    value: function importa(negociacaoList) {

                        return Promise.all([this.obter('negociacoes/semana'),
                        //this.obter('negociacoes/anterior'),
                        //this.obter('negociacoes/retrasada'),
                        this.lista()]).then(function (negociacoes) {
                            console.log(negociacoes);
                            return negociacoes.reduce(function (arrayAchatado, array) {
                                return arrayAchatado.concat(array);
                            }, []).filter(function (negociacao) {
                                return !negociacaoList.some(function (f) {
                                    return JSON.stringify(negociacao) == JSON.stringify(f);
                                });
                            });
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map