// const express = require('express');
// const https = require('https');
// const axios = require('axios');
// const fs = require('fs')

// const app = express();
// app.use(express.json());

// let server;
// let client;

// const PORT = 5443;
// const IP = "192.168.0.92";

// before(function (done) {
//   const key = fs.readFileSync('C:\\Users\\agalt\\OneDrive\\Desktop\\Socket\\server\\Cert\\server.key');
//   const cert = fs.readFileSync('C:\\Users\\agalt\\OneDrive\\Desktop\\Socket\\server\\Cert\\server.crt');
//   const options = { key, cert };

//   server = https.createServer(options, app).listen(PORT, IP, () => {
//     console.log(`Server listening at https://${IP}:${PORT}`);

//     client = axios.create({
//       httpsAgent: new https.Agent({
//         rejectUnauthorized: false,
//       }),
//       baseURL: `https://${IP}:${PORT}`,
//     });

//     done();
//   });
// });

// after(function () {
//   server.close();
// });

// module.exports = { app, client };
