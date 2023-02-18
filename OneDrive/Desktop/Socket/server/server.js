const https = require("https");
const fs = require("fs");
const io = require("socket.io");
const path = require("path");
const cors = require("cors");
let bodyParser = require("body-parser");
const axios = require('axios');

const PORT = 5443;
const IP = "192.168.0.92"; //"192.168.1.153"; //"192.168.1.52"; //"192.168.88.236"
// const html = fs.readFileSync("index.html");
const express = require("express");


let app = new express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use('/*', express.static(path.join(__dirname,'style.css')))
app.use(express.static(__dirname));
// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname));
// });

let key = fs.readFileSync(
  "C:\\Users\\agalt\\OneDrive\\Desktop\\Socket\\server\\Cert\\server.key"
);
let cert = fs.readFileSync(
  "C:\\Users\\agalt\\OneDrive\\Desktop\\Socket\\server\\Cert\\server.crt"
);
let options = {
  key: key,
  cert: cert,
};

const server = https.createServer(options, app).listen(PORT, IP, () => {
  console.log(`Express app listening at http: ${IP}:${PORT}`);
});

const instance = axios.create({
  validateStatus: function (status) {
    return true; // ignore self-signed certificate error
  }
});

const agent = new https.Agent({
  rejectUnauthorized: false
});

let clientCount = 0;
const maxClients = 1;

// server.maxConnections = 1
const socket = io(server, {
  cors: {
    origin: "*",
  },
});
let batteryStatus;
let deviceInfo;
let positionInfo
let networkInfo;
let messagesRecieved = []
socket.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  if (clientCount >= maxClients) {
    console.log('Reached maximum number of clients, denying connection');
    return socket.disconnect(true);
  }
  
  clientCount++;

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    clientCount--;
  });
  console.log(socket.id);
  socket.on("pictureTaken", (image) => {
    console.log("event: pictureTaken");
    fs.writeFileSync(`imgs/picture.jpg`, image, "base64");
  });

  socket.on("battery", (batteryInfo)=>{
    console.log(batteryInfo)
    batteryStatus=batteryInfo
  })

  socket.on("deviceInfo", (device)=>{
    console.log(device)
    deviceInfo = device
  })

  socket.on("position", (position)=>{
    console.log("Position: " + position)
    positionInfo = position
  })

  socket.on("networkInfo", (network)=>{
    console.log("networkInfo: " + Object.keys(network))
    networkInfo = network
  })

  socket.on("recieveMessage", (message)=>{
    console.log("Message Recieved: " + message)
    messagesRecieved.push(message)
    console.log(messagesRecieved)
  })
  
  socket.on("test", ()=>{
    console.log("test event emitted")
  })
});

//Home Page
app.get("/", (req, res) => {
  res.status(200).render("index",);
});
//Take a photo
app.get("/camera", function (req, res) {
  // res.render("camera", {picture: "imgs/logo1.png", })
  console.log("camera");
  socket.emit("camera")
  res.render("camera")
});

app.get("/picture", (req, res) => {
  const filePath = "imgs/picture.jpg"; // replace with the actual file path
  fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
          res.json({fileExists: false});
      } else {
          res.json({fileExists: true});
      }
  });
});

app.get("/createFile", (req, res) => {
  const parameter = req.query.fileName;
  console.log(parameter)
  fs.writeFileSync(`outputs/${parameter}.jpg`, fs.readFileSync("imgs/picture.jpg"))
  res.render("index")
});


//Battery Status

app.get("/batteryStatus", function (req, res) {
  console.log("batteryStatus");
  socket.emit("batteryStatus")
  res.render("batteryStatus")
});

app.get("/batteryInfo", function(req, res){
  console.log(batteryStatus)
  res.render("batteryInfo", { batteryStatus: batteryStatus.level, IsPlugged: batteryStatus.isPlugged });
})

// device info

app.get("/deviceInfo", function (req, res) {
  console.log("deviceInfo");
  socket.emit("device")
  res.render("deviceInfo")
});

app.get("/showDeviceInfo", function (req, res) {
  res.render("showDeviceInfo", {deviceInfo: deviceInfo})
});

// posizione

app.get("/getPosition", function (req, res) {
  console.log("getPosition");
  socket.emit("getPosition")
  res.render("getPosition")
});

app.get("/getPositionInfo", function (req, res) {
  res.render("getPositionInfo", {latitude: positionInfo[0], longitude: positionInfo[1]})
});

// informazioni di rete

app.get("/getNetworkInfo", function (req, res) {
  console.log("network");
  socket.emit("network")
  res.render("network")
});

app.get("/networkInfo", function (req, res) {
  res.render("networkInfo", {network: networkInfo.type})
});

// scambio di messaggi

app.get("/writeMessage", function (req, res) {
  res.render("sendMessage")
});

app.get("/sendMessage", function (req, res) {
  console.log("message sent");
  const message = req.query.param;
  console.log(message)
  socket.emit("sendMessage", message)
  res.render("index")
});

app.get("/recieveMessage", function (req, res) {
  console.log("message recieved");
  console.log("This are the messages recieved: " + messagesRecieved)
  res.render("recieveMessage", {messagesRecieved: JSON.stringify(messagesRecieved)})
});

// reset
app.get("/reset", (req, res) => {
  const parameter = req.query;
  if(parameter=='camera'){
    console.log()
  const filePath = "imgs/picture.jpg"; // replace with the actual file path
  if(fs.existsSync(filePath)){
    fs.unlinkSync(filePath)
  }
}else if(parameter=='audio'){
  const filePath = "output/audio.mp3";
  
}
res.render("index")
});





// socket.on("connection", (socket) => {
//   console.log(socket.id);
//   let src;
//   const parameter = req.query.parameter;
//   if (parameter === "camera") {
//     console.log("Camera");
//     socket.emit("camera");
//     socket.on("pictureTaken", (image) => {
//       console.log("event: pictureTaken");
//       pictureNumber = pictureNumber + 1;
//       console.log(pictureNumber);
//       fs.writeFileSync(`imgs/picture.jpg`, image, "base64");
//       res.redirect("/camera")

//     });
//   }
// });

// app.get("/batteryStatus", function (req, res) {
//   const socket1 = io(server, {
//     cors: {
//       origin: "*",
//     },
//   });

//   socket1.on("connection", (socket) => {
//     console.log(socket.id);
//     socket.on("custom-event", (number, string, object) => {
//       console.log(number, string, object);
//     });
//     socket.on("battery", (data) => {
//       console.log("event: pictureTaken");
//       res.render("index", { batteryStatus: data, picture: "imgs/logo1.png" });
//       socket1.close();
//     });

//     socket.emit("batteryStatus", "battery");
//   });
// });

// app.get("/recAudio", function (req, res) {
//   // res.sendFile(path.join(__dirname, "recAudio.html"));
//   // res.write("camera Button Clicked")
//   // socket.emit("camera", "camera")
// });

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

// SWITCH-CASE
// let day = "Monday";

// switch (day) {
//   case "Monday":
//     console.log("Today is Monday.");
//     break;
//   case "Tuesday":
//     console.log("Today is Tuesday.");
//     break;
//   case "Wednesday":
//     console.log("Today is Wednesday.");
//     break;
//   default:
//     console.log("Today is some other day.");
// }
