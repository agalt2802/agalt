"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = void 0;
const http = require("http");
const fs = require("fs");
const io = require("socket.io");
const path = require("path");
const cors = require("cors");
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;
var bodyParser = require('body-parser');
const PORT = 3000;
const IP = "192.168.1.52"; //"192.168.88.236"
const html = fs.readFileSync("index.html");
const express = require("express");
let app = new express();
app.use(cors());
app.use(bodyParser.json());

// app.use('/*', express.static(path.join(__dirname,'style.css')))
app.use(express.static(__dirname));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
const server = http.createServer(app).listen(PORT, IP, () => {
  console.log(`Express app listening at http: ${IP}:${PORT}`);
});
// const server = http.createServer((req,res)=>{
//   // res.writeHead("Access-Control-Allow-Origin: *")
//   res.writeHead(200, { 'content-type': 'text/html' })
//   // fs.createReadStream('index.html').pipe(res)
//   // res.write("This is Giulia's server")
//   res.end(html)
// }).listen(PORT, IP, () =>{
//   console.log(`Server listening at: ${IP}:${PORT}`)
// })
// const socket =  io(server, {
//     cors:{
//         origin: '*'
//     }
// })

app.post('/camera', function (req, res) {
  res.sendFile(html);
  console.log(req.data);
});
const socket = io(server, {
  cors: {
    origin: "*"
  }
});

// socket.on('connection', socket =>{
//   console.log(socket.id)
//   socket.on('custom-event',(number, string, object)=>{
//     console.log(number, string, object)
//   })
// })

// const dom = new JSDOM(html);
// // const jquery = require("jquery")(dom.window);
// // jquery("body").append("<p>Is a cool Website</p>");
// // const content = dom.window.document.getElementById("camera");
// // console.log(content.textContent);

// console.log(dom.window.document.getElementById('camera').textContent);

// const camera = dom.window.document.getElementById("camera")

// console.log(camera.addEventListener)

// // camera.textContent = 'Changed'
// // const camera = dom.window.document.getElementById("camera").textContent
// // camera.addEventListener('click', () =>{
// //   camera.textContent = "Clicked"
// // })

// // function myFunction(){
// //   document.getElementById("camera").style.color = "red";
// // }
exports.socket = socket;