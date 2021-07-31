"use strict";

var Paypal = {
  variables: {
    BACKEND_URL: 'http://localhost:3000',
    TOKEN: localStorage.getItem('token')
  },
  htmlElements: {
    paypalContainer: document.getElementById('paypal-button-container')
  },
  initializeData: {
    initPaypalButton: function initPaypalButton(products) {
      Paypal.htmlElements.paypalContainer.innerHTML = '';
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'paypal'
        },
        createOrder: function createOrder(data, actions) {
          return regeneratorRuntime.async(function createOrder$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap(actions.order.create({
                    purchase_units: [{
                      "amount": {
                        "currency_code": "USD",
                        "value": Paypal.roundPrice(products)
                      }
                    }],
                    application_context: {
                      brand_name: 'EYH Store',
                      landing_page: 'NO_PREFERENCE',
                      ser_action: 'PAY_NOW'
                    }
                  }));

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          });
        },
        onApprove: function onApprove(data, actions) {
          return actions.order.capture().then(function (details) {
            Paypal.events.addToHistory(details);
          });
        },
        onError: function onError(err) {
          console.log(err);
        }
      }).render(Paypal.htmlElements.paypalContainer);
    }
  },
  roundPrice: function roundPrice(products) {
    var totalPrice = 0;
    var prices = 0;

    if (products.length > 0) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var product = _step.value;
          prices += product.unitPrice;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return totalPrice = Math.round(prices * 100) / 100;
    } else {
      return totalPrice = Math.round(products.unitPrice * 100) / 100;
    }
  },
  events: {
    addToHistory: function addToHistory(details) {
      var comprobante, pedido, response;
      return regeneratorRuntime.async(function addToHistory$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              comprobante = {
                details: details
              };
              _context2.next = 3;
              return regeneratorRuntime.awrap(Paypal.utils.postData("".concat(Paypal.variables.BACKEND_URL, "/api/store/pedidos?token=").concat(Paypal.variables.TOKEN), comprobante));

            case 3:
              pedido = _context2.sent;
              response = pedido;
              alert("¡Compra realizada con éxito!");
              console.log(response);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  },
  utils: {
    postData: function postData(url) {
      var data,
          response,
          _args3 = arguments;
      return regeneratorRuntime.async(function postData$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.next = 3;
              return regeneratorRuntime.awrap(fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json"
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data)
              }));

            case 3:
              response = _context3.sent;
              return _context3.abrupt("return", response.json());

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }
};