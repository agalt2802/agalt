/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");

  window.addEventListener("batterystatus", onBatteryStatus, false);

  function onBatteryStatus(status) {
    document.getElementById("position").innerHTML =
      "Level: " + status.level + " isPlugged: " + status.isPlugged;
  }

  window.addEventListener("batterylow", onBatteryLow, false);

  function onBatteryLow(status) {
    document.getElementById("position").innerHTML =
      "Battery Level Low " + status.level + "%";
  }

  window.addEventListener("batterycritical", onBatteryCritical, false);

  function onBatteryCritical(status) {
    // capire se e come si può inviare una notifica in push
    document.getElementById("position").innerHTML =
      "Battery Level Critical " + status.level + "%\nRecharge Soon!";
  }

  document.getElementById("cam").addEventListener("click", getPhoto);

  function getPhoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
    });
  }
  function onSuccess(imageData) {
    var image = document.getElementById("myImage");
    image.src = "data:image/jpeg;base64," + imageData;
    navigator.notification.confirm(
      "You took a picture!", // message
      onConfirm, // callback to invoke with index of button pressed
      "Picture Taken", // title
      ["Ok", "Exit"] // buttonLabels
    );
  }

  function onFail(message) {
    alert("Failed because: " + message);
  }

  function setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
    };
    return options;
  }
  let selection = "camera-thmb";
  function openCamera(selection) {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    // var func = createNewFileEntry;

    if (selection == "camera-thmb") {
      options.targetHeight = 100;
      options.targetWidth = 100;
    }

    navigator.camera.getPicture(
      function cameraSuccess(imageUri) {
        var image = document.getElementById("myImage");
        image.src = "data:image/jpeg;base64," + imageUri;

        navigator.notification.confirm(
          "You took a picture!", // message
          onConfirm, // callback to invoke with index of button pressed
          "Picture Taken", // title
          ["Restart", "Exit"] // buttonLabels
        );
      },
      function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
      },
      options
    );
  }

  function onConfirm(buttonIndex) {}
}
