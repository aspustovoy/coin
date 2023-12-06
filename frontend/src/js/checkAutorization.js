import renderEntry from './renderEntry';
import renderError from './renderError';
import authorizationEvent from './authorizationEvent';

export default function checkAutorization(historyEvent, data) {
  const token = JSON.parse(localStorage.getItem('token'));

  if (!token) {
    const btnSubmit = renderEntry();
    btnSubmit.addEventListener('click', (event) => {
      event.preventDefault();
      authorizationEvent();
    });
    renderError('Unauthorized');
  } else {
    renderEntry();
    historyEvent(data);
  }
}
