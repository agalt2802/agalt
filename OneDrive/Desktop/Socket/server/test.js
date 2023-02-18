// const io = require("socket.io-client");
// const serverUrl = "https://192.168.0.92:5443";
// console.log("sto eseguendo il modulo test.js")
// let client1;
// client1 = io.connect("https://192.168.0.92:5443", {rejectUnauthorized: false});
// console.log(client1)
// const connectToServer = () => {
//   return new Promise((resolve, reject) => {
//     client1.on("connect", () => {
//       console.log("connected to server");
//       console.log(client1.id);
//       resolve();
//     });
//     client1.on("error", (err) => {
//       reject(err);
//     });
//   });
// };

// connectToServer()
//   .then(() => {
//     console.log("Connected to server successfully!");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to server: ", err);
//   });

