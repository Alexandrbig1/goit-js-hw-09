import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const elements = {
  startBtn: document.querySelector('[data-start'),
  dateInput: document.getElementById('datetime-picker'),
  days: document.querySelector('[data-days'),
  hours: document.querySelector('[data-hours'),
  minutes: document.querySelector('[data-minutes'),
  seconds: document.querySelector('[data-seconds'),
};

elements.startBtn.addEventListener('click', onStartBtnCountdown);

elements.startBtn.disabled = true;

let dates = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      elements.startBtn.disabled = false;
      dates = selectedDates[0];
    }
  },
};

flatpickr(elements.dateInput, options);

let intervalId = 0;

function onStartBtnCountdown() {
  intervalId = setInterval(createTimer, 1000);
  elements.startBtn.disabled = true;
  elements.dateInput.disabled = true;
}

function createTimer() {
  const totalMs = dates - new Date();
  const dayPicker = convertMs(totalMs).days;
  const hoursPicker = convertMs(totalMs).hours;
  const minutesPicker = convertMs(totalMs).minutes;
  const secondsPicker = convertMs(totalMs).seconds;
  elements.days.textContent = dayPicker < 10 ? '0' + dayPicker : dayPicker;
  elements.hours.textContent =
    hoursPicker < 10 ? '0' + hoursPicker : hoursPicker;
  elements.minutes.textContent =
    minutesPicker < 10 ? '0' + minutesPicker : minutesPicker;
  elements.seconds.textContent =
    secondsPicker < 10 ? '0' + secondsPicker : secondsPicker;

  if (minutesPicker === 0 && secondsPicker === 0) {
    clearTimer();
  }
}

function clearTimer() {
  clearInterval(intervalId);
  elements.startBtn.disabled = true;
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
