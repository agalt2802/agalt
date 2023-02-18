
document.addEventListener("deviceready", onDeviceReady, false);
// window.addEventListener("batterystatus", onBatteryStatus, false);
function onDeviceReady() {
  navigator.notification.alert("Hello");
  
  document.getElementById("connect").addEventListener("click", ()=>{
    const socket = io("https://192.168.0.92:5443");
    if (!socket.connected) {
      socket.on(
        "connect",
        () => {
          navigator.notification.alert("Connected to server");
          socket.emit("test");
  
          socket.on("command", (data) => {
            alert("recieved: " + data);
          });
  
          socket.on("camera", () => {
            navigator.camera.getPicture(onSuccess, onFail, {
              quality: 100,
              destinationType: Camera.DestinationType.DATA_URL,
              targetHeight: 100,
              targetWidth: 100,
            });
          });
  
          socket.on("batteryStatus", () => {
            window.addEventListener("batterystatus", onBatteryStatus, false);
          });
  
          socket.on("device", () => {
            if (typeof window !== "undefined") {
              var client = new ClientJS();
  
              var browser = client.getBrowser();
              var os = client.getOS();
              var deviceType = client.getDeviceType();
  
              alert("Operating System: " + os);
  
              socket.emit("deviceInfo", [os]);
            } else {
              socket.emit("deviceInfo", [device.model, device.platform]);
              alert(device.model + device.platform);
            }
          });
  
          socket.on("getPosition", () => {
            navigator.geolocation.getCurrentPosition(
              geolocationSuccess,
              geolocationError,
              { enableHighAccuracy: true }
            );
          });
  
          socket.on("network", () => {
            let network = checkConnection();
            socket.emit("networkInfo", network);
          });
  
          socket.on("sendMessage", (message) => {
            // create a new div element
            var newDiv = document.createElement("div");
  
            // add text to the div
            var newContent = document.createTextNode(`${message}`);
            newDiv.appendChild(newContent);
  
            // add styles to the div
            newDiv.style.backgroundColor = "white";
            newDiv.style.padding = "10px";
            newDiv.style.width = "200px";
            // newDiv.style.margin = "20px auto";
  
            // add the div to the document body
            document.body.appendChild(newDiv);
          });
        },
        (error) => {
          alert(error);
        }
      );
      
      // sending message to the server
      document.getElementById("messageToSendToServer").addEventListener("click", function () {
        let message = document.getElementById("messageToSend").value
        alert(message)
        socket.emit("recieveMessage", message)
        document.getElementById("messageToSend").value = ""
      });
    }
  })

  // funzioni 
  function onSuccess(imageData) {
    let image = document.getElementById("test");
    image.src = "data:image/jpeg;base64," + imageData;
    socket.emit("pictureTaken", imageData);
  }

  function onFail(message) {
    alert("Failed because: " + message);
  }

  function onBatteryStatus(status) {
    socket.emit("battery", status);
    alert(status.level);
  }

  function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("results").append(div);
  }

  function geolocationSuccess(position) {
    socket.emit("position", [
      position.coords.latitude,
      position.coords.longitude,
    ]);
    alert(
      "Latitude: " +
        position.coords.latitude +
        "\n" +
        "Longitude: " +
        position.coords.longitude +
        "\n" +
        "Altitude: " +
        position.coords.altitude +
        "\n" +
        "Accuracy: " +
        position.coords.accuracy +
        "\n" +
        "Altitude Accuracy: " +
        position.coords.altitudeAccuracy +
        "\n" +
        "Heading: " +
        position.coords.heading +
        "\n" +
        "Speed: " +
        position.coords.speed +
        "\n" +
        "Timestamp: " +
        position.timestamp +
        "\n"
    );
  }

  function geolocationError(error) {
    alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
  }

  function checkConnection() {
    // browser --> always unknown
    // andoird --> hould work well
    if (typeof window !== "undefined") {
      alert("siamo qui");
      if (navigator.connection) {
        const connection = navigator.connection;
        alert("Connection Type: " + connection.type);
        return connection;
      } else {
        alert("Network Information API is not supported in this browser.");
      }
    } else {
      var networkState = navigator.connection;

      var states = {};
      states[Connection.UNKNOWN] = "Unknown connection";
      states[Connection.ETHERNET] = "Ethernet connection";
      states[Connection.WIFI] = "WiFi connection";
      states[Connection.CELL_2G] = "Cell 2G connection";
      states[Connection.CELL_3G] = "Cell 3G connection";
      states[Connection.CELL_4G] = "Cell 4G connection";
      states[Connection.CELL] = "Cell generic connection";
      states[Connection.NONE] = "No network connection";

      alert("Connection type: " + states[networkState.type]);
      return networkState;
    }
  }

 
}
