import { Request, Response } from "express";
const express = require("express");
const bodyParser = require("body-parser");
const { SerialPort } = require("serialport");
const Readline = require("@serialport/parser-readline");

const app = express();
const expressPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(expressPort, () => {
  console.log(`Listening on port ${expressPort}`);
});

// SOCKET IO
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("connection works!!" + socket.id);
});

//MAC
// REMINDER: ls /dev/tty.*
const port = new SerialPort({ path: "/dev/tty.usbmodem14302", baudRate: 9600 });

// WINDOWS
//const port = new SerialPort({ path: "COM3", baudRate: 9600 });

port.on("data", (sample) =>
  console.log("this is here in the port on" + sample)
);

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

// send desired voltage

app.post("/voltage", (req: Request, res: Response) => {
  const desiredVoltage = req.body.voltage;
  const normalizedVoltage = desiredVoltage / 0.2;

  const converted_to_8bit = new Uint8Array([normalizedVoltage]);

  console.log("his is the check" + converted_to_8bit[0]);
  console.log(`The normalized voltage ${normalizedVoltage}`);

  if (desiredVoltage >= 0 && desiredVoltage <= 30) {
    setTimeout(() => {
      port.write(converted_to_8bit, (err: Error) => {
        if (err) {
          console.log("Error on write: ", err.message);
        }
      });
    }, 500);
  }
  res.sendStatus(200);
});
