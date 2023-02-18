const io = require("socket.io-client");
const assert = require("assert");
const request = require("supertest");
const { expect } = require("chai");

const https = require("https");

const agent = new https.Agent({ rejectUnauthorized: false });

const serverUrl = "https://192.168.0.92:5443";
console.log("sto eseguendo il modulo test.js");
let client;
const connectToServer = () => {
  return new Promise((resolve, reject) => {
    client.on("connect", () => {
      console.log("connected to server");
      console.log(client.id);
      assert.notEqual(client.id, undefined);
      resolve();
    });
    client.on("error", (err) => {
      reject(err);
    });
  });
};

describe("Server Tests", function () {
  describe("Connection Tests", function (done) {
    it("Should connect clients to server", function () {
      client = io.connect(serverUrl, { rejectUnauthorized: false });
      connectToServer()
        .then(() => {
          console.log("Connected to server successfully!");
          client.disconnect();
        })
        .catch((err) => {
          console.error("Failed to connect to server: ", err);
        });
    });
  });
});

describe("Test endpoint", () => {
  it("should respond with status code 200 and render index.ejs", async () => {
    try{
    const response = await fetch("https://192.168.0.92:5443", { rejectUnauthorized: false });
    expect(response.status).to.equal(200);
  }catch(errore){
    console.log(errore)
  }
  });
});

//   it("Should limit number of clients", function () {
//     let i = 0
//     console.log("eseguiamo il test")
//     while(i < 10){
//       client = io.connect(serverUrl, { rejectUnauthorized: false });
//       connectToServer()
//       .then(() => {
//         console.log("Connected to server successfully!");
//         i++
//       })
//       .catch((err) => {
//         console.error("Failed to connect to server: ", err);
//       });
//     }

//   });
// });

// describe("Picture Tests", function () {
//   it("Should save picture on pictureTaken event", function (done) {
//     // Emit pictureTaken event with base64-encoded image data
//     const imageData = "abc123";
//     client.emit("pictureTaken", imageData);

//     // Wait for file to be written
//     setTimeout(() => {
//       const fs = require("fs");
//       const filePath = "imgs/picture.jpg";
//       assert.equal(fs.existsSync(filePath), true);
//       const data = fs.readFileSync(filePath, { encoding: "base64" });
//       assert.equal(data, imageData);
//       done();
//     }, 1000);
//   });
// });

// describe("Battery Tests", function () {
//   it("Should store battery info on battery event", function () {
//     const batteryInfo = { level: 50, charging: true };
//     client.emit("battery", batteryInfo);
//     assert.deepEqual(client.batteryStatus, batteryInfo);
//   });
// });

// describe("Device Info Tests", function () {
//   it("Should store device info on deviceInfo event", function () {
//     const deviceInfo = { model: "iPhone", os: "iOS" };
//     client.emit("deviceInfo", deviceInfo);
//     assert.deepEqual(client.deviceInfo, deviceInfo);
//   });
// });

// describe("Position Tests", function () {
//   it("Should store position info on position event", function () {
//     const position = { latitude: 37.7749, longitude: -122.4194 };
//     client.emit("position", position);
//     assert.deepEqual(client.positionInfo, position);
//   });
// });

// describe("Network Info Tests", function () {
//   it("Should store network info on networkInfo event", function () {
//     const networkInfo
