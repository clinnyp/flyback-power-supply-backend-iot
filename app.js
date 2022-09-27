const express = require("express");
const app = express();
const expressPort = 3000;
const { SerialPort } = require("serialport");

//MAC
const port = new SerialPort({ path: "/dev/tty.usbmodem14402", baudRate: 9600 });

// WINDOWS
//const port = new SerialPort({ path: "COM3", baudRate: 9600 });

app.get("/on", (req, res) => {
  setTimeout(() => {
    port.write("1", function (err) {
      if (err) {
        return console.log("Error on write: ", err.message);
      }
      console.log("message written");
    });
  }, 1000);
});

app.get("/off", (req, res) => {
  setTimeout(() => {
    port.write("0", function (err) {
      if (err) {
        return console.log("Error on write: ", err.message);
      }
      console.log("message written");
    });
  }, 1000);
});

app.listen(expressPort, () => {
  console.log(`Listening on port ${expressPort}`);
});
