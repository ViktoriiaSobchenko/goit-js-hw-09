const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
startBtn.addEventListener('click', startColorSwitcher);
stopBtn.addEventListener('click', stopColorSwitcher);

function colorSwitcher() {
  const getColor = getRandomHexColor();
  document.body.style.backgroundColor = `${getColor}`;
}

function startColorSwitcher() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(colorSwitcher, 1000);
}

function stopColorSwitcher() {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(intervalId);
}
