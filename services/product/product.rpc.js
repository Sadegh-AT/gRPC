const ProductModel = require("./product.model");

async function listProduct(call, callback) {
  const res = await ProductModel.find().lean();

  callback(null, { products: res });
}
async function getProduct(call, callback) {
  const { id } = call.request;
  const res = await ProductModel.findById(id).lean();
  console.log(res);
  callback(null, { ...res });
}
async function createProduct(call, callback) {
  const { title, price } = call.request;
  const res = await ProductModel.create({ title, price });
  callback(null, { status: `Add new product: ${res.title}` });
}
async function updateProduct(call, callback) {}
async function deleteProduct(call, callback) {}

module.exports = {
  listProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
