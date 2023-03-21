import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', handlePromise);

function handlePromise(event) {
  event.preventDefault();

  const { delay, step, amount } = event.target.elements;

  for (let i = 1; i <= amount.value; i++) {
    const delayNum = Number(delay.value);
    const stepNum = Number(step.value);

    const currentDelay = delayNum + stepNum * i;
    createPromise(i, currentDelay)
      .then(({ i, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ i, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
  }
}

function createPromise(i, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ i, delay });
      } else {
        reject({ i, delay });
      }
    }, delay);
  });
}