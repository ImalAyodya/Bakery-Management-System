const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  unitCost: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: String,
    required: true,
  },
});

const Production = mongoose.model('Production', productionSchema);

module.exports = Production;
