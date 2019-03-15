/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

var dataAtual = new Date();
var dataAnterior = new Date();
dataAnterior.setDate(dataAtual.getDate() - 7);
var dateRetrasada = new Date();
dateRetrasada.setDate(dataAtual.getDate() - 14);

var negociacoes = [
      { _data : dataAtual, _quantidade : 1, _valor : 150},
      { _data : dataAtual, _quantidade : 2, _valor : 250},
      { _data : dataAtual, _quantidade : 3, _valor : 350},
      { _data : dataAnterior, _quantidade : 1, _valor : 450},
      { _data : dataAnterior, _quantidade : 2, _valor : 550},
      { _data : dataAnterior, _quantidade : 3, _valor : 650},
      { _data : dateRetrasada, _quantidade : 1, _valor : 750},
      { _data : dateRetrasada, _quantidade : 2, _valor : 950},
      { _data : dateRetrasada, _quantidade : 3, _valor : 950}
    ];


api.listaSemana = function(req, res) {
    var negociacoesAtuais = negociacoes.filter(function(negociacao) {
        return new Date(negociacao.data) > dataAnterior;
    });
    res.json(negociacoes);
};

api.listaAnterior = function(req, res) {
   
   var negociacoesAnteriores = negociacoes.filter(function(negociacao) {
        return negociacao.data < dataAtual && negociacao.data > dateRetrasada;
    });
	setTimeout(function() {
		res.json(negociacoesAnteriores);	
	}, 500);
    
};

api.listaRetrasada = function(req, res) {

   var negociacoesRtrasadas = negociacoes.filter(function(negociacao) {
        return negociacao.data < dataAnterior;
    });
    res.json(negociacoesRtrasadas);
};

api.cadastraNegociacao = function(req, res) {

   req.body._data = req.body._data.replace(/-/g,'/').substring(0, 9);
   negociacoes.push(req.body);
   res.status(200).json("Negociação recebida");
};



module.exports = api;