'use strict';

System.register(['../models/ListaNegociacao', '../models/Mensagem', '../views/NegociacaoView', '../views/MensagemView', '../services/NegociacaoService', '../helpers/DateHelper', '../helpers/Bind', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var ListaNegociacao, Mensagem, NegociacaoView, MensagemView, NegociacaoService, DateHelper, Bind, Negociacao, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function currentInstance() {

        return negociacaoController;
    }

    _export('currentInstance', currentInstance);

    return {
        setters: [function (_modelsListaNegociacao) {
            ListaNegociacao = _modelsListaNegociacao.ListaNegociacao;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_viewsNegociacaoView) {
            NegociacaoView = _viewsNegociacaoView.NegociacaoView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
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

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    this._listaNegociacao = new Bind(new ListaNegociacao(), new NegociacaoView($('#negociacaoView')), 'adiciona', 'esvazia');

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

                    this._service = new NegociacaoService();

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._service.lista().then(function (negociacaoList) {
                            return negociacaoList.forEach(function (negociacao) {
                                return _this._listaNegociacao.adiciona(negociacao);
                            });
                        });

                        setInterval(function () {
                            return _this._importaNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: 'adiciona',
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();
                        var negociacao = this._criaNegociacao();
                        this._service.cadastra(negociacao).then(function (mensagem) {
                            _this2._listaNegociacao.adiciona(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limpaFormulario();
                        }).catch(function (err) {
                            return _this2._mensagem.texto = err;
                        });
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        var _this3 = this;

                        this._service.apaga().then(function (mensagem) {
                            _this3._mensagem.texto = mensagem;
                            _this3._listaNegociacao.esvazia();
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {

                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {

                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;
                        this._inputData.focus();
                    }
                }, {
                    key: '_importaNegociacoes',
                    value: function _importaNegociacoes() {
                        var _this4 = this;

                        this._service.importa(this._listaNegociacao.negociacoes).then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                _this4._listaNegociacao.adiciona(negociacao);
                                _this4._mensagem.texto = "Negociações do periodo importadas";
                            });
                        }).catch(function (err) {
                            return _this4._mensagem.texto = err;
                        });
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map