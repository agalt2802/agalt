import { getSockt } from './server.js';
const socket = getSockt()
console.log('hello')

function myFunction(){
  socket.emit('camera', 'camera')
  document.getElementById("camera").style.color = "red";
  console.log("hello")
}

