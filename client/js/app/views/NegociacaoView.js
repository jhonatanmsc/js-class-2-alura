'use strict';

System.register(['./View'], function (_export, _context) {
	"use strict";

	var View, _createClass, NegociacaoView;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	return {
		setters: [function (_View2) {
			View = _View2.View;
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

			NegociacaoView = function (_View) {
				_inherits(NegociacaoView, _View);

				function NegociacaoView(elemento) {
					_classCallCheck(this, NegociacaoView);

					return _possibleConstructorReturn(this, (NegociacaoView.__proto__ || Object.getPrototypeOf(NegociacaoView)).call(this, elemento));
				}

				_createClass(NegociacaoView, [{
					key: 'template',
					value: function template(model) {

						return '\n\t\t<table class="table table-hover table-bordered">\n\t        <thead>\n\t            <tr>\n\t                <th>DATA</th>\n\t                <th>QUANTIDADE</th>\n\t                <th>VALOR</th>\n\t                <th>VOLUME</th>\n\t            </tr>\n\t        </thead>\n\t        \n\t        <tbody>\n        \t' + model.negociacoes.map(function (negociacao) {
							return '\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t' + DateHelper.dataParaTexto(negociacao.data) + '\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>' + negociacao.quantidade + '</th>\n\t\t\t\t\t\t<th>' + negociacao.valor + '</th>\n\t\t\t\t\t\t<th>' + negociacao.obtemVolume() + '</th>\n\t\t\t\t\t</tr>\n    \t\t\t';
						}).join('') + '\n\t        </tbody>\n\t        \n\t        <tfoot>\n\t        \t<td colspan="3"></td>\n\t        \t<td>\n\t\t\t\t' + model.volumeTotal + '\n\t        \t</td>\n\t        </tfoot>\n\t    </table>\n\t\t';
					}
				}]);

				return NegociacaoView;
			}(View);
		}
	};
});
//# sourceMappingURL=NegociacaoView.js.map