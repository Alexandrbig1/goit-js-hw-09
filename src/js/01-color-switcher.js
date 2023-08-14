const elements = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

elements.startBtn.addEventListener('click', onStartBtnClick);
elements.stopBtn.addEventListener('click', onStopBtnClick);

let timeId = null;
let startBtnActive = false;

function onStartBtnClick() {
  timeId = setInterval(changeColor, 1000);

  if (!startBtnActive) {
    elements.startBtn.removeEventListener('click', onStartBtnClick);
  }
}

function onStopBtnClick() {
  clearInterval(timeId);
  if (!startBtnActive) {
    elements.startBtn.addEventListener('click', onStartBtnClick);
  }
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
