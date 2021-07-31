"use strict";

require('dotenv').config();

var express = require('express');

var _require = require('./db/dbconfig'),
    dbConnection = _require.dbConnection;

var cors = require('cors');

var app = express();
var port = process.env.PORT;
dbConnection();
app.use(cors());
app.use(express.json());
app.use(require('./routes/index'));
app.listen(port, function () {
  console.log("Servidor BACKEND en puerto: ".concat(port));
});