document.getElementById("myButton").addEventListener("click", function () {
    // Get the value of the parameter
    // var parameterValue = document.getElementById("parameterInput").value;
    console.log("button clicked");
    var parameterValue = "camera";
    // Make the request
    fetch("https://192.168.0.92:443/picture")
      .then((response) => response.json())
      .then((data) => {
        if (data.fileExists) {
          document.getElementById("pictureTaken").src = "imgs/picture.jpg";
        } else {
          console.log("File not found");
        }
      });
  });
  
  document.getElementById("resetCamera").addEventListener("click", function () {
    fetch("https://192.168.0.92:443/reset?param=camera")
      .then((response) => {
        if (
          response.ok &&
          response.headers.get("Content-Type").includes("text/html")
        ) {
          return response.text();
        } else {
          throw new Error("Response not ok");
        }
      })
      .then((html) => {
        document.body.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  
  const downloadFile = () => {
    const content = "This is the content of the file";
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "file.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
  };
  
  // document.getElementById("savePhoto").addEventListener("click", downloadFile);
  
  document.getElementById("savePhoto").addEventListener("click", function () {
    let parent = document.getElementById("results");
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter the file name");
    input.setAttribute("id", "inputBox")
    parent.append(input);
  
    let confirmButton = document.createElement("button")
    confirmButton.setAttribute("class", "button")
    confirmButton.setAttribute("id", "confirm")
    confirmButton.innerHTML = "Confirm"
    parent.append(confirmButton)
  
    saveFile()
    
    fetch("https://192.168.0.92:443/save?param=camera")
      .then((response) => {
        if (
          response.ok &&
          response.headers.get("Content-Type").includes("text/html")
        ) {
          return response.text();
        } else {
          throw new Error("Response not ok");
        }
      })
      .then((html) => {
        document.body.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  
  function saveFile(){
    document.getElementById("confirm").addEventListener("click", function () {
      let input = document.getElementById("inputBox")
      let fileName = input.value
      let url = "https://192.168.0.92:443/createFile?fileName=" + encodeURIComponent(fileName)
      fetch(url)
        .then((response) => {
          if (
            response.ok &&
            response.headers.get("Content-Type").includes("text/html")
          ) {
            return response.text();
          } else {
            throw new Error("Response not ok");
          }
        })
        .then((html) => {
          document.body.innerHTML = html;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }