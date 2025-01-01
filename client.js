const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the protobuf
const PROTO_PATH = "./protos/echo.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const { echoPackage } = grpc.loadPackageDefinition(packageDefinition);

// Replace 'yourpackage' and 'Service' with your actual package and service names
const Service = echoPackage.EchoService;

function main() {
  const client = new Service(
    "localhost:3200",
    grpc.credentials.createInsecure()
  );

  // Example of calling a method on the service
  client.EchoUnray({ value: "value" }, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Response:", response);
    }
  });
}

main();
