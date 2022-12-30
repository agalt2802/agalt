// import { io } from "socket.io-client";
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  navigator.notification.alert("Hello");
  const socket = io("https://192.168.1.153:443");

  socket.on("connect",() => {
      navigator.notification.alert("Connected to server");
      
      socket.on("camera", () => {
        
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          targetHeight: 100,
          targetWidth: 100,
        });
      });

      
      // displayMessage(`${socket.id}`);
      

      // socket.on("batteryStatus", (battery) => {
      //   window.addEventListener("batterystatus", onBatteryStatus, false);

      //   function onBatteryStatus(status) {
      //     socket.emit("battery", status)
      //   }

      // });
    },
    (error) => {
      console.log(error);
    }
  );

  function onSuccess(imageData) {
    let image = document.getElementById("test");
    image.src = "data:image/jpeg;base64," + imageData;
    socket.emit("pictureTaken", imageData);

  }

  function onFail(message) {
    alert("Failed because: " + message);
  }

  function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("results").append(div);
  }

  // let cameraButton = document.getElementById("camera");
  // cameraButton.addEventListener("click", () => {
  //   alert("A picture was taken with metod 1");
  // });
}
