import { ListaNegociacao } from '../models/ListaNegociacao';
import { Mensagem } from '../models/Mensagem';
import { NegociacaoView } from '../views/NegociacaoView';
import { MensagemView } from '../views/MensagemView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';
import { Negociacao } from '../models/Negociacao';

class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacao = new Bind(
            new ListaNegociacao(),
            new NegociacaoView($('#negociacaoView')),
            'adiciona', 'esvazia'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );

        this._service = new NegociacaoService();

        this._init();
    }

    _init() {

        this._service
            .lista()
            .then(negociacaoList =>
                negociacaoList.forEach(negociacao =>
                    this._listaNegociacao.adiciona(negociacao)))

        setInterval(() => this._importaNegociacoes(), 3000);
    }

    adiciona(event) {

        event.preventDefault();
        let negociacao = this._criaNegociacao();
        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacao.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(err => this._mensagem.texto = err);
    }

    apaga() {

        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacao.esvazia();
            })
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    _importaNegociacoes() {

        this._service
            .importa(this._listaNegociacao.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => {
                    this._listaNegociacao.adiciona(negociacao);
                    this._mensagem.texto = "Negociações do periodo importadas"
                })
            })
            .catch(err => this._mensagem.texto = err);
    }
}

let negociacaoController = new NegociacaoController();

export function currentInstance() {

    return negociacaoController;

}