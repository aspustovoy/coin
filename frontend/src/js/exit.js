import renderEntry from './renderEntry';
import authorizationEvent from './authorizationEvent';

export default function exit() {
  window.token = '';
  const btnSubmitNew = renderEntry();
  btnSubmitNew.addEventListener('click', (event) => {
    event.preventDefault();
    authorizationEvent();
  });
}
