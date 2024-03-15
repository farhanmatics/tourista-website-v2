let currentIndex = 0;
const hello = ["Visas", "Travel", "Paperwork", "Tours", "Holidays"];

function randomIndex() {
  return ~~(Math.random() * hello.length);
}

window.setInterval(function () {
  let newIndex = randomIndex();
  while (newIndex === currentIndex) newIndex = randomIndex();
  currentIndex = newIndex;
  document.getElementById("animtext").textContent = hello[currentIndex];
}, 2300);
