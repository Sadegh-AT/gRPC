const { Schema, Types, model } = require("mongoose");
const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: false, default: 0 },
});

const ProductModel = model("product", ProductSchema);
module.exports = ProductModel;
