const { SerialPort } = require("serialport");

// MAC
const port = new SerialPort({ path: "/dev/tty.usbmodem14402", baudRate: 9600 });

// WINDOWS
//const port = new SerialPort({ path: "COM3", baudRate: 9600 });

setTimeout(() => {
  port.write("0", function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("message written");
  });
}, 1000);
