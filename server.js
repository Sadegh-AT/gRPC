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

// Implement the SayHello RPC method
function sayHello(call, callback) {
  const name = call.request.name;
  callback(null, { message: `Hello, ${name}!` });
}

// Create the server
const server = new grpc.Server();

server.addService(exampleProto.ExampleService.service, { SayHello: sayHello });

// Start the server
const port = "50051";
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  }
);