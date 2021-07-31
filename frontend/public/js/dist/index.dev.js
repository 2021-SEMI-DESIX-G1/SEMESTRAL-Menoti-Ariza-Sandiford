"use strict";

(function () {
  var App = {
    variables: {
      BACKEND_URL: 'http://localhost:3000',
      TOKEN: localStorage.getItem('token')
    },
    htmlElements: {
      productsContainer: document.getElementById('container-products')
    },
    init: function init() {
      App.bindEvents();
      App.initializeData.products();
    },
    bindEvents: function bindEvents() {
      App.htmlElements.productsContainer.addEventListener('click', App.events.addToCart);
    },
    initializeData: {
      products: function products() {
        var data, products;
        return regeneratorRuntime.async(function products$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(App.utils.getData("".concat(App.variables.BACKEND_URL, "/api/store/products")));

              case 2:
                data = _context.sent;
                products = data.productos;
                products.forEach(function (product) {
                  App.events.getProducts(product);
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        });
      }
    },
    events: {
      getProducts: function getProducts(_ref) {
        var description = _ref.description,
            id = _ref.id,
            img = _ref.img,
            productName = _ref.productName,
            status = _ref.status,
            unitPrice = _ref.unitPrice;
        App.htmlElements.productsContainer.innerHTML += "<div class=\"card\" style=\"width: 18rem;\" id=\"".concat(id, "\">\n                        <img src=\"").concat(img, "\" class=\"card-img-top\" alt=\"CELL\">\n                        <button class=\"btn-cart\" type=\"submit\" id=\"add_cart\">\n                        <a href=\"/producto?product=").concat(id, "\" id=\"").concat(id, "\" class=\"card-link\">Agregar al Carrito</a>\n                        </button>\n                        <div class=\"card-body\" id=\"").concat(id, "\">\n                            <h5 class=\"card-title\">").concat(productName, "</h5>\n                            <p class=\"card-text\"><b>Descripci\xF3n: </b>").concat(description, "</p>\n                            <p class=\"card-text\"><b>Costo: </b>").concat(unitPrice, "</p>\n                        </div>\n                    </div>"); // <a href="#" id="cart-${id}" class="card-link">Agregar al carrito</a>
      },
      addToCart: function addToCart(event) {
        var productId, index, body;
        return regeneratorRuntime.async(function addToCart$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event.preventDefault(); // ESTO NO VA A FUNCIONAR SIN UN FORMULARIO?
                //btn_click=e.target.parentNode.id
                //var index =e.target.parentNode.parentNode.id;

                productId = event.target.parentNode.id;
                index = event.target.parentNode.parentNode.id;
                console.log();

                if (!(productId == "add_cart")) {
                  _context2.next = 9;
                  break;
                }

                // cart.addToCart(productId);
                console.log(event.target);
                body = {
                  item: index
                };
                _context2.next = 9;
                return regeneratorRuntime.awrap(App.utils.postData("".concat(App.variables.BACKEND_URL, "/api/store/cart?token=").concat(App.variables.TOKEN), body));

              case 9:
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
      postData: function postData(url) {
        var data,
            response,
            _args4 = arguments;
        return regeneratorRuntime.async(function postData$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                data = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.prev = 1;
                _context4.next = 4;
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

              case 4:
                response = _context4.sent;
                console.log(JSON.stringify(data));
                return _context4.abrupt("return", response.json());

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                throw new Error("Error: ".concat(_context4.t0));

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, null, null, [[1, 9]]);
      }
    }
  };
  App.init();
})();