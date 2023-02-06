import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.getElementById('datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    input.value = selectedDates[0];

    if (selectedDates[0] < Date.now()) {
      Notiflix.Report.failure(
        'Warning',
        'Please choose a date in the future',
        'Ok'
      );
      return;
    }
    startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', startTimer);

function startTimer() {
  intervalId = setInterval(onCountDown, 1000);
  startBtn.disabled = true;
  input.disabled = true;
}

function onCountDown() {
  const setDate = new Date(input.value).getTime();
  const currentTime = Date.now();
  const ms = setDate - currentTime;

  if (ms < 1000) {
    stopTimer();
  }
  const time = convertMs(ms);
  updateDatetimePicker(time);
}

function stopTimer() {
  clearInterval(intervalId);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateDatetimePicker({ days, hours, minutes, seconds }) {
  daysRef.textContent = days;
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
