"use strict";

var _require = require('../helper/google-verify'),
    googleVerify = _require.googleVerify;

var jwt = require('jsonwebtoken');

var Authentication = {
  googleSignIn: function googleSignIn(req, res) {
    var id_token, googleUser, token;
    return regeneratorRuntime.async(function googleSignIn$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id_token = req.body.id_token;
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(googleVerify(id_token));

          case 4:
            googleUser = _context.sent;
            token = jwt.sign({
              user: googleUser
            }, process.env.SEED, {
              expiresIn: process.env.EXPIRES_TOKEN
            });
            return _context.abrupt("return", res.status(200).json({
              message: 'Se inició sesión con Google',
              token: token
            }));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(400).json({
              message: 'Token de google no válido'
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 9]]);
  }
};
module.exports = {
  Authentication: Authentication
};