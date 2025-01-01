function EchoUnray(call, callback) {
  callback(null, call.request);
}
function EchoClientStream(call, callback) {
  let names = [];
  call.on("data", function (request) {
    names.push(request.value);
  });

  call.on("end", function () {
    callback(null, names);
  });
}
function EchoServerStream(call) {
  let data = [];

  for (let i = 0; i < 10; i++) {
    call.write([{ value: i }]);
  }
  //   call.end();
}
function EchoBidiStream(call) {
  call.on("data", function (request) {
    console.log(request.value);
    call.write({ value: "SAdas" });
  });
  call.on("end", function () {
    call.end();
  });
}

module.exports = {
  EchoUnray,
  EchoClientStream,
  EchoServerStream,
  EchoBidiStream,
};
