document.getElementById("batteryInfo").addEventListener("click", function () {
    fetch("https://192.168.0.92:443/batteryInfo")
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