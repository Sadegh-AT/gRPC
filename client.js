const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the proto file
const packageDefinition = protoLoader.loadSync("echo.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const exampleProto = grpc.loadPackageDefinition(packageDefinition).example;

// Create a client
const client = new exampleProto.ExampleService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Call the SayHello RPC
client.SayHello({ name: "World" }, (error, response) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Response:", response.message);
  }
});
