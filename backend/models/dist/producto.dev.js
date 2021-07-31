"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var ProductoSchema = Schema({
  productName: {
    type: String,
    required: true,
    unique: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  img: {
    type: String
  },
  status: {
    type: Boolean,
    required: true,
    "default": true
  }
});
ProductoSchema.method('toJSON', function () {
  var _this$toObject = this.toObject(),
      _id = _this$toObject._id,
      __v = _this$toObject.__v,
      object = _objectWithoutProperties(_this$toObject, ["_id", "__v"]);

  object.id = _id;
  return object;
});
module.exports = model('Producto', ProductoSchema);