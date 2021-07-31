"use strict";

var express = require('express');

var app = express();
app.use(require('./productos'));
app.use(require('./auth'));
app.use(require('./cart'));
module.exports = app;