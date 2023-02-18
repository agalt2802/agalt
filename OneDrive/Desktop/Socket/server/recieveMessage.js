let messages = window.messagesRecieved
console.log(messages)
let div =  document.getElementById("last10Messages")
let newP = document.createElement("p");
let newContent;
for (const element of messages) {
    console.log(element);
    newContent = document.createTextNode(`${element}`);
    newP.appendChild(newContent)
    let newBr = document.createElement("br");
    newP.appendChild(newBr);
    div.appendChild(newP);
  }
// console.log(messagesArray)



