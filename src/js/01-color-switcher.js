const body = document.querySelector('body')
const stopBtn = document.querySelector('[data-stop]');
const startBtn = document.querySelector('[data-start]');


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


startBtn.addEventListener('click', () => {
    timerBgId = setInterval(() => {
    document.body.style.backgroundColor =
    getRandomHexColor()}, 1000);
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled', true);
});



stopBtn.addEventListener('click', () => {
    clearInterval(timerBgId);
    stopBtn.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled', true);
});



stopBtn.style.cursor = "pointer";
startBtn.style.cursor = "pointer";