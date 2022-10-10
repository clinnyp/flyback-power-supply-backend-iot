const express = require("express");
const bodyParser = require("body-parser");
const { SerialPort } = require("serialport");
import { Request, Response } from "express";

const app = express();
const expressPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MAC
const port = new SerialPort({ path: "/dev/tty.usbmodem14402", baudRate: 9600 });

// WINDOWS
//const port = new SerialPort({ path: "COM3", baudRate: 9600 });

app.get("/on", (req: Request, res: Response) => {
  setTimeout(() => {
    port.write("1", function (err: Error) {
      if (err) {
        console.log("Error on write: ", err.message);
      }
      console.log("message written");
    });
  }, 1000);
});

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

app.get("/refresh", (req: Request, res: Response) => {
  const samples = [];
});

app.post("/voltage", (req: Request, res: Response) => {
  const desiredVoltage = req.body.voltage;

  console.log(`The desired voltage ${desiredVoltage}`);

  setTimeout(() => {
    port.write(desiredVoltage, (err: Error) => {
      if (err) {
        console.log("Error on write: ", err.message);
      }
    });
  }, 500);

  res.sendStatus(200);
});

app.listen(expressPort, () => {
  console.log(`Listening on port ${expressPort}`);
});

function normaliseVoltage(desiredVoltage: number) {
  desiredVoltage;
}
