import { Request, Response } from "express";
const express = require("express");
const bodyParser = require("body-parser");
const { SerialPort } = require("serialport");

const app = express();
const expressPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(expressPort, () => {
  console.log(`Listening on port ${expressPort}`);
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("connection works!!" + socket.id);
});

//MAC
//const port = new SerialPort({ path: "/dev/tty.usbmodem14402", baudRate: 9600 });

// WINDOWS
//const port = new SerialPort({ path: "COM3", baudRate: 9600 });

// app.get("/on", (req: Request, res: Response) => {
//   setTimeout(() => {
//     port.write("1", function (err: Error) {
//       if (err) {
//         console.log("Error on write: ", err.message);
//       }
//       console.log("message written");
//     });
//   }, 1000);
// });

// app.get("/off", (req, res) => {
//   setTimeout(() => {
//     port.write("0", function (err) {
//       if (err) {
//         console.log("Error on write: ", err.message);
//       }
//       console.log("message written");
//     });
//   }, 1000);
// });

// get 5 samples of vout

// app.get("/refresh", (req: Request, res: Response) => {
//   const samples = [];

//   setTimeout(() => {
//     port.on("data", (sample: number) => samples.push(sample));
//   }, 2000);

//   res.json({ vout: samples });
// });

// send desired voltage

app.post("/voltage", (req: Request, res: Response) => {
  const desiredVoltage = req.body.voltage;

  console.log(`The desired voltage ${desiredVoltage}`);

  // if (desiredVoltage >= 0 && desiredVoltage <= 30) {
  //   setTimeout(() => {
  //     port.write(desiredVoltage, (err: Error) => {
  //       if (err) {
  //         console.log("Error on write: ", err.message);
  //       }
  //     });
  //     res.sendStatus(200);
  //   }, 500);
  // }
});

function normaliseVoltage(desiredVoltage: number) {
  desiredVoltage;
}
