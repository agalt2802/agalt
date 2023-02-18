// console.log(position)
const map = L.map("map").setView([window.latitude, window.longitude], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([window.latitude, window.longitude])
  .addTo(map)
  .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  .openPopup();