const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { connectToMongo } = require("./src/utils/mongoose.connection");
const {
  listProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./src/rpc/product.rpc");

connectToMongo("mongodb://127.0.0.1:27017");

// Load the proto file
const productDefinition = protoLoader.loadSync("./src/protos/product.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const { productPackage } = grpc.loadPackageDefinition(productDefinition);

// Create the server
const server = new grpc.Server();

server.addService(productPackage.ProductService.service, {
  listProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
});

// Start the server
const port = "3200";
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  }
);
