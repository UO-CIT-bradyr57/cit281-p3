/* 
  CIT Project 3
  Name: Brady Rogers
*/

// Part 7 adding packages and coinCount function
const http = require("http");
const fs = require("fs");
const fastify = require("fastify")({
  logger: false,
});
const { coinCount } = require("./p3-module.js");

// Part 8
fastify.get("/", (req, res) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      res
        .code(500)
        .header("Content-Type", "text/html")
        .send("Error processing request");
    } else {
      res.code(200).header("Content-Type", "text/html").send(data);
    }
  });
});

// Part 9
// coin route with get verb
fastify.get("/coin", (req, res) => {
  let { denom = 0, count = 0 } = req.query;
  denom = parseInt(denom);
  count = parseInt(count);
  // console.log(req.query);
  // console.log(denom);
  // console.log(count);
  let coinValue = coinCount({ denom, count });
  res
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

// Part 10
// coins route with get verb
fastify.get("/coins", (req, res) => {
  let { option } = req.query;
  option = parseInt(option);
  let coinValue = [];
  const coins = [
    { denom: 25, count: 2 },
    { denom: 1, count: 7 },
  ];
  switch (option) {
    case 1:
      coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
      break;
    case 2:
      coinValue = coinCount(...coins);
      break;
    default:
      coinValue = 0;
      break;
  }

  res
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

// fastify listen() section
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${listenIP}:${listenPort}`);
});
