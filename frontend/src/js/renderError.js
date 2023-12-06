import { el } from 'redom';

let count = 0;
export default function renderError(message) {
  count++;
  const err = el('div. alert alert-danger', message, { id: `error${count}` });
  document.querySelector('.error-container').append(err);

  function delElement(id) {
    setTimeout(() => {
      if (document.getElementById(id)) document.getElementById(id).remove();
    }, 3000);
  }
  delElement(err.id);
}
