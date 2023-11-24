const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
let colorChangeInterval; 


startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

function startColorChange() {  
    startButton.disabled = true;
    stopButton.disabled = false;
    colorChangeInterval = setInterval(changeBodyColor, 1000);
}

function stopColorChange() {  
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(colorChangeInterval);
}

function changeBodyColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

