import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const elements = {
  startBtn: document.querySelector('[data-start'),
  dateInput: document.getElementById('datetime-picker'),
  days: document.querySelector('[data-days'),
  hours: document.querySelector('[data-hours'),
  minutes: document.querySelector('[data-minutes'),
  seconds: document.querySelector('[data-seconds'),
};

// elements.startBtn.addEventListener('click', onStartBtnCountdown);

elements.startBtn.disabled = true;

let totalMs = 0;
let currentTime = new Date();
pickingDate();

function pickingDate() {
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] > currentTime) {
        elements.startBtn.disabled = false;
        elements.startBtn.addEventListener('click', onStartBtnCountdown);
        totalMs = selectedDates[0] - currentTime;
      } else {
        window.alert('Please choose a date in the future');
      }
    },
  };
  flatpickr(elements.dateInput, options);
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

function creating() {
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
}

function onStartBtnCountdown() {
  setInterval(creating, 1000);
}

// elements.startBtn.disabled = true;
// const currentTime = new Date();
// console.log(currentTime);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const selectedDate = selectedDates[0];
//     if (selectedDate < currentTime) {
//       window.alert('Please choose a date in the future');
//     } else {
//       elements.startBtn.disabled = false;
//     }
//   },
// };

// flatpickr(elements.dateInput, options);

// 1111111

// onClose(selectedDates) {
//     if (selectedDates[0] > currentTime) {
//       elements.startBtn.disabled = false;
//       const totalMs = selectedDates[0] - currentTime;
//       const dayPicker = convertMs(totalMs).days;
//       const hoursPicker = convertMs(totalMs).hours;
//       const minutesPicker = convertMs(totalMs).minutes;
//       const secondsPicker = convertMs(totalMs).seconds;
//       elements.days.textContent = dayPicker < 10 ? '0' + dayPicker : dayPicker;
//       elements.hours.textContent =
//         hoursPicker < 10 ? '0' + hoursPicker : hoursPicker;
//       elements.minutes.textContent =
//         minutesPicker < 10 ? '0' + minutesPicker : minutesPicker;
//       elements.seconds.textContent =
//         secondsPicker < 10 ? '0' + secondsPicker : secondsPicker;
//     } else {
//       window.alert('Please choose a date in the future');
//     }
//   },
