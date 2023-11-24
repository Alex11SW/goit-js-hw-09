import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
          const selectedDate = selectedDates[0];

      if (selectedDate < new Date()) {
            window.alert("Please choose a date in the future");
            document.querySelector('[data-start]').disabled = true;
          } else {
            document.querySelector('[data-start]').disabled = false;
          }
  },
};
 const flatpickrInstance = flatpickr("#datetime-picker", options);


function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    //const currentDate = new Date();
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

let timerInterval;

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentDate = new Date();
  let timeDifference = selectedDate - currentDate;

  timerInterval = setInterval(() => {
    const time = convertMs(timeDifference);

    document.querySelector('[data-days]').textContent = addLeadingZero(time.days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(time.hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(time.minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(time.seconds);

    timeDifference -= 1000;

    if (timeDifference < 0) {
      clearInterval(timerInterval);
      document.querySelector('[data-start]').disabled = true;
    }
  }, 1000);
});

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}