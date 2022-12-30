// import { io } from "socket.io-client";
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  navigator.notification.alert("Hello");
  const socket = io("https://192.168.1.153:443");

  socket.on("connect", () => {
    navigator.notification.alert("Connected to server");
    displayMessage(`${socket.id}`);
    socket.on("camera", (camera) => {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
      });
    });
  });

  function onSuccess(imageData) {
    console.log("pictureTaken");

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

  let cameraButton = document.getElementById("camera");
  cameraButton.addEventListener("click", () => {
    alert("A picture was taken with metod 1");
  });
}
