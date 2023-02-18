document.getElementById("sendMessage").addEventListener("click", function () {
    let message = document.getElementById("messageToSend").value
    console.log(message)
    fetch(`https://192.168.0.92:443/sendMessage?param=${message}`)
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