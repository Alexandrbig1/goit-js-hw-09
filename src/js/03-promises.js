import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const btnEl = document.querySelector('[type="submit"]');

formEl.addEventListener('submit', onSubmitClick);

function onSubmitClick(e) {
  e.preventDefault();

  let delay = +formEl.delay.value;
  const step = +formEl.step.value;
  const amount = +formEl.amount.value;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
  // #1
  // formEl.reset();
  // #2
  btnEl.disabled = true;
  // #3
  // formEl.delay.value = '';
  // formEl.step.value = '';
  // formEl.amount.value = '';
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
