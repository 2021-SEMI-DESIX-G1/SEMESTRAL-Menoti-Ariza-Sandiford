"use strict";

(function () {
  var App = {
    htmlElements: {
      google_logout: document.getElementById('a-logout'),
      google_profile: document.getElementById('data_profile')
    },
    init: function init() {
      App.bindEvents();
    },
    bindEvents: function bindEvents() {
      App.htmlElements.google_logout.addEventListener("click", App.events.googleSignOut);
    },
    events: {
      googleSignOut: function googleSignOut() {
        var auth2;
        return regeneratorRuntime.async(function googleSignOut$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return regeneratorRuntime.awrap(gapi.auth2.getAuthInstance());

              case 3:
                auth2 = _context.sent;
                _context.next = 6;
                return regeneratorRuntime.awrap(auth2.signOut());

              case 6:
                localStorage.removeItem('token');
                console.log('User signed out.');
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                throw new Error("Google logout error: ".concat(_context.t0));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[0, 10]]);
      }
    }
  };
  App.init();
})();

function onSignIn(googleUser) {
  var id_token, profile, data, resp, user;
  return regeneratorRuntime.async(function onSignIn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(googleUser.getAuthResponse().id_token);

        case 3:
          id_token = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(googleUser.getBasicProfile());

        case 6:
          profile = _context2.sent;
          data = {
            id_token: id_token
          };
          _context2.next = 10;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/api/store/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }));

        case 10:
          resp = _context2.sent;
          _context2.next = 13;
          return regeneratorRuntime.awrap(resp.json());

        case 13:
          user = _context2.sent;
          console.log(user);
          console.log('Nombre: ' + profile.getName());
          localStorage.setItem('token', user.token);
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          throw new Error("Google Authentication error: ".concat(_context2.t0));

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 19]]);
}