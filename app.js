const { SerialPort } = require("serialport");

const port = new SerialPort({ path: "COM3", baudRate: 9600 });

// const buffer = Buffer.from("1");

setTimeout(() => {
  port.write("0", function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("message written");
  });
}, 1000);
