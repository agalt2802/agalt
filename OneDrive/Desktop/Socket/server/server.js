const https = require("https");
const fs = require("fs");
const io = require("socket.io");
const path = require("path");
const cors = require("cors");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var bodyParser = require("body-parser");

const PORT = 443;
const IP = "192.168.1.153" //"192.168.1.52"; //"192.168.88.236"
// const html = fs.readFileSync("index.html");
const express = require("express");

let app = new express();
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({    
  extended: true
}))

// app.use('/*', express.static(path.join(__dirname,'style.css')))
app.use(express.static(__dirname));
// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname));
// }); 


var key = fs.readFileSync("C:\\Users\\agalt\\OneDrive\\Desktop\\Socket\\server\\Cert\\server.key");
var cert = fs.readFileSync("C:\\Users\\agalt\\OneDrive\\Desktop\\Socket\\server\\Cert\\server.crt");
var options = {
  key: key,
  cert: cert
};

const server = https.createServer(options, app).listen(PORT, IP, () => {
  console.log(`Express app listening at http: ${IP}:${PORT}`);
});

// server.maxConnections = 1

app.get("/", (req, res)=>{
  res.render("index", {batteryStatus: "", picture: "imgs/logo1.png", },)
})

// app.get("/reset", (req, res)=>{
//   res.render("index", {picture: "imgs/logo1.png", },)
// })

app.get("/camera", function (req, res) {
  // res.render("camera", {picture: "imgs/logo1.png", })
  const socket = io(server, {
    cors: {
      origin: "*",
    },
  });
  
  socket.on("connection", socket =>{ 
    console.log(socket.id)
    socket.emit("camera")
    socket.on("pictureTaken", (image)=>{
    console.log("event: pictureTaken")
    fs.writeFileSync("imgs/picture.jpg", image, "base64")
    let src= "data:image/jpeg;base64," + image;
    res.render("index", {batteryStatus: "", picture: src})
  
  })
  
  
  
  }) 
  // socket1.close()
});

app.get("/batteryStatus", function (req, res) {
  const socket1 = io(server, {
    cors: {
      origin: "*",
    },
  });
  
  socket1.on("connection", socket =>{ 
    console.log(socket.id)
    socket.on('custom-event',(number, string, object)=>{
      console.log(number, string, object)
    })
    socket.on("battery", (data)=>{
    console.log("event: pictureTaken")
    res.render("index", {batteryStatus: data, picture: "imgs/logo1.png"})
    socket1.close()
  })
  
  socket.emit("batteryStatus", "battery")
  
  }) 
});

app.get("/recAudio", function (req, res) {
  // res.sendFile(path.join(__dirname, "recAudio.html"));
  // res.write("camera Button Clicked")
  // socket.emit("camera", "camera")
});

// const socket = io(server, {
//   cors: {
//     origin: "*",
//   },
// });

// socket.on('connection', socket =>{
//   console.log(socket.id)
//   socket.on('custom-event',(number, string, object)=>{
//     console.log(number, string, object)
//   })
  // socket.on("pictureTaken", (image)=>{
  //   console.log("event: pictureTaken")
  //   fs.writeFileSync("imgs/picture.jpg", image)
    
    
    
  // })
// })
