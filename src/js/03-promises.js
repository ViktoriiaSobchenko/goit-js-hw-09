import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');

formRef.addEventListener('submit', onSubmit);

let position = 0;

function onSubmit(evt) {
  evt.preventDefault();
  let delay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);

  for (let i = 1; i <= amount; i += 1) {
    position = i;

    createMessage(position, delay);

    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function createMessage(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
        timeout: 5000,
      });
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
        timeout: 5000,
      });
    });
}
