import { el } from 'redom';
import paymentIcon from './paymentIcon';

export default function autocomplete() {
  let coinAccounts = localStorage.getItem('coin');
  if (coinAccounts) {
    coinAccounts = JSON.parse(localStorage.getItem('coin'));
  } else coinAccounts = [];

  let arrFilter = [];
  const waitTime = 300;
  const inputContainer = document.querySelector('.input-to-container');
  const searсhInput = document.getElementById('to');
  const svgIcon = inputContainer.querySelector('svg');
  let timeout;
  const autocompleteList = el(
    'div.dropdown-content dropdown-content--transfer',
  );

  searсhInput.addEventListener('input', () => {
    arrFilter = [];
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      autocompleteList.replaceChildren();

      coinAccounts.forEach((e) => {
        if (e.includes(searсhInput.value.trim()) && searсhInput.value !== '')
          arrFilter.push(e);
      });

      if (arrFilter.length !== 0) {
        inputContainer.append(autocompleteList);
        svgIcon.classList.add('svg-rotate');

        arrFilter.forEach((e) => {
          const autocompleteBtn = el('button.dropdown-content-btn');
          autocompleteBtn.textContent = e;
          autocompleteList.append(autocompleteBtn);

          autocompleteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            searсhInput.value = e;
            const trasferForm = document.querySelector('.transfer-form');
            if (paymentIcon(e)) trasferForm.append(paymentIcon(e));
            autocompleteList.remove();
            svgIcon.classList.remove('svg-rotate');
          });
        });
      } else {
        autocompleteList.remove();
        svgIcon.classList.remove('svg-rotate');
      }
    }, waitTime);
  });
}
