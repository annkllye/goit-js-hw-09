import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const flatpickrInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataSec = document.querySelector('[data-seconds]');
const dataMin = document.querySelector('[data-minutes]');
const dataHours = document.querySelector('[data-hours]');
const dataDays = document.querySelector('[data-days]');


const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

function timerUpd({ seconds, minutes, hours, days }) {
    dataSec.textContent = seconds;
    dataMin.textContent = minutes;
    dataHours.textContent = hours;
    dataDays.textContent = days;
};

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;



const currentTime = Date.now();

startBtn.disabled = true;
startBtn.addEventListener('click', onStartCounter);
flatpickrInput.addEventListener('click', onSecondCounter);
function onSecondCounter() {
  counter.restart()
}



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selected) {
    if (selected[0].getTime() > currentTime) {
      selectedDate = selected[0].getTime();
        startBtn.disabled = false;
        
    } else {
      Report.failure('Sorry', 'Please choose a date in the future');
    }
  },
};



flatpickr(flatpickrInput, options);



function onStartCounter() {
  counter.start();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}


const counter = {
  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;
      timerUpd(convertMs(deltaTime));
      startBtn.disabled = true;


      if (deltaTime <= 1000) {
        this.stop();
      }}, TIMER_DELAY);
},
    
 restart() {
    startBtn.disabled = true;
    flatpickrInput.disabled = false;
    clearInterval(intervalId);
    dataSec.textContent = `00`;
    dataMin.textContent = `00`;
    dataHours.textContent = `00`;
    dataDays.textContent = `00`;
    
    return;
},
 
  stop() {
    startBtn.disabled = true;
    flatpickrInput.disabled = false;
    clearInterval(intervalId);
    return;
},
 
};



