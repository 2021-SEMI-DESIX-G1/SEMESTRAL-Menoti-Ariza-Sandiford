"use strict";

(function () {
  var App = {
    variables: {
      cart: [],
      total: 0,
      BACKEND_URL: 'http://localhost:3000',
      TOKEN: localStorage.getItem('token')
    },
    htmlElements: {
      productContainer: document.getElementById('product-container'),
      totalContainer: document.getElementById('total')
    },
    init: function init() {
      App.initializeData.cart();
      App.bindEvents();
    },
    bindEvents: function bindEvents() {
      if (App.htmlElements.productContainer != null) {
        App.htmlElements.productContainer.addEventListener('click', App.events.OnRemoveCart);
      }
    },
    initializeData: {
      cart: function cart() {
        var data;
        return regeneratorRuntime.async(function cart$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(App.utils.getData("".concat(App.variables.BACKEND_URL, "/api/store/cart?token=").concat(App.variables.TOKEN)));

              case 2:
                data = _context.sent;
                App.variables.cart = data.cart;

                if (App.htmlElements.productContainer != null) {
                  Paypal.initializeData.initPaypalButton(App.initializeData.existCar());
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        });
      },
      existCar: function existCar() {
        App.htmlElements.productContainer.innerHTML = '';
        App.variables.total = 0;
        App.variables.cart.forEach(function (product) {
          App.events.getCart(product);
          App.variables.total += product.item.unitPrice;
        });
        var items = [];
        var rounded = Math.round(App.variables.total * 100) / 100;
        App.htmlElements.totalContainer.innerHTML = rounded;
        App.variables.cart.forEach(function (element) {
          items.push(element.item);
        });
        return items;
      }
    },
    events: {
      getCart: function getCart(_ref) {
        var email = _ref.email,
            id = _ref.id,
            item = _ref.item,
            name = _ref.name,
            picture = _ref.picture;
        console.log(item);
        App.htmlElements.productContainer.innerHTML += "<div class='table'>\n                                    <div>\n                                      <div class=\"Row\">\n                                        <div class=\"Cell\" class=\"center\" > <img src=\"".concat(item.img, "\" class=\"card-img-top\" width=\"200\" height=\"200\"></div>\n                                        <div class=\"Cell\" ><p class=\"center\">").concat(item.productName, "</p></div>\n                                        <div class=\"Cell\" ><p class=\"center\">Precio: ").concat(item.unitPrice, "</p></div>\n                                        <div class=\"Cell\" class='card-botones' id='").concat(id, "'>\n                                           <button  class=\"btn-cart\"id='btn-remove-").concat(id, "' type=\"button\">Quitar</button>\n                                        </div>\n                                        </div>\n                                    </div>\n                                </div>");
      },
      OnRemoveCart: function OnRemoveCart(event) {
        var idCart, remove;
        return regeneratorRuntime.async(function OnRemoveCart$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                idCart = event.target.parentElement.id;

                if (!(event.target.id === "btn-remove-".concat(idCart))) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return regeneratorRuntime.awrap(App.utils.deleteData("".concat(App.variables.BACKEND_URL, "/api/store/cart?token=").concat(App.variables.TOKEN), idCart));

              case 4:
                remove = _context2.sent;
                console.log(remove);
                App.initializeData.cart();

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        });
      }
    },
    utils: {
      getData: function getData(url) {
        var response;
        return regeneratorRuntime.async(function getData$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return regeneratorRuntime.awrap(fetch(url));

              case 3:
                response = _context3.sent;
                return _context3.abrupt("return", response.json());

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                throw new Error("Error: ".concat(_context3.t0));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, null, null, [[0, 7]]);
      },
      deleteData: function deleteData(url, id) {
        var body, response;
        return regeneratorRuntime.async(function deleteData$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                body = {
                  id: id
                };
                _context4.prev = 1;
                _context4.next = 4;
                return regeneratorRuntime.awrap(fetch(url, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(body)
                }));

              case 4:
                response = _context4.sent;
                return _context4.abrupt("return", response.json());

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                throw new Error("Error: ".concat(_context4.t0));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, null, null, [[1, 8]]);
      }
    }
  };
  App.init();
})();