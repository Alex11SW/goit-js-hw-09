import Notiflix from 'notiflix';


const refs = {
  formElem: document.querySelector('.form'),
};
refs.formElem.addEventListener('submit', onFormInput);
  


  function onFormInput(e){
    e.preventDefault();
  const firstDelay = parseInt(this.elements.delay.value, 10);
  const step = parseInt(this.elements.step.value, 10);
  const amount = parseInt(this.elements.amount.value, 10);

  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * step;
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
       
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
       console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
       
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      shouldResolve? resolve({ position, delay }): reject({ position, delay });
    }, delay);
  });
}
