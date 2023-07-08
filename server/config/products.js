const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  quality: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("product", productSchema);
