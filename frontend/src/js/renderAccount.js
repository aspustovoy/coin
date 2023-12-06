import { el, setChildren } from 'redom';
import chartForAccount from './chartForAccount';
import renderTransactionHistory from './renderTransactionHistory';
import transferEvent from './transferEvent';
import autocomplete from './autocompleteTransfer';
import paymentIcon from './paymentIcon';
import loadBalanceEvent from './loadBalanceEvent';

export default function renderAccount() {
  const data = JSON.parse(localStorage.getItem('accountData'));
  const container = document.querySelector('.main-container');
  container.classList.remove('main-container--start');
  container.innerHTML = '';

  const numberOfRecords = 10;
  const numberOfMonthsForAccount = 6;

  if (window.socket) window.socket.close();

  const btnsList = document.querySelector('.nav');
  btnsList.style.display = 'flex';

  if (document.querySelector('.header-btn--active')) {
    document
      .querySelector('.header-btn--active')
      .classList.remove('header-btn--active');
  }

  const accountTop = el('div.account-top');

  const rowTitle = el(
    'div.d-flex flex-wrap align-items-center justify-content-between info-container',
  );
  const title = el('h2.custom-title account-title', 'Просмотр счёта');

  const icon1 = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13H20V11H7.83Z" fill="white"/>
  </svg> Вернуться назад`;

  const backBtn = el('button.btn btn-primary btn-custom back-btn');
  backBtn.insertAdjacentHTML('beforeend', icon1);
  setChildren(rowTitle, [title, backBtn]);

  const rowInfo = el(
    'div.d-flex flex-wrap  align-items-center justify-content-between',
  );
  const accountNumber = el('span.d-inline title-value', `№ ${data.account}`);

  const balanceContainer = el('div.d-flex w-100');
  const balanceTitle = el('span.text-custom balance-text d-inline', 'Баланс');
  const balanceValue = el(
    'span.balance-value d-inline',
    `${Math.floor(data.balance)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`,
  );
  setChildren(balanceContainer, [balanceTitle, balanceValue]);

  setChildren(rowInfo, [accountNumber, balanceContainer]);

  setChildren(accountTop, [rowTitle, rowInfo]);

  const accountBottom = el(
    'div.account-bottom d-flex flex-wrap justify-content-between',
  );

  const trasferForm = el('form.transfer-form transfer-form--transfer');

  const transferTitle = el('h4.text-custom transfer-title', 'Новый перевод');

  const rowNumber = el('div.input-container d-flex align-items-center');
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
  <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#182233"/>
  </svg>`;
  const numberLabel = el(
    'label.input-descr input-descr--transfer',
    'Номер счёта получателя',
  );
  const colNumber = el('div.input-to-container w-100');
  const numberInput = el('input.form-control form-control--transfer', {
    placeholder: 'Placeholder',
    type: 'number',
    id: 'to',
  });
  setChildren(colNumber, numberInput);
  setChildren(rowNumber, [numberLabel, colNumber]);
  colNumber.insertAdjacentHTML('beforeend', icon);

  const rowAmount = el('div.input-container d-flex align-items-center');
  const amountLabel = el(
    'label.input-descr input-descr--transfer',
    'Сумма перевода',
  );
  const colAmount = el('div.w-100');
  const amountInput = el('input.form-control form-control--transfer', {
    placeholder: 'Placeholder',
    type: 'number',
    id: 'amount',
  });
  setChildren(colAmount, amountInput);
  setChildren(rowAmount, [amountLabel, colAmount]);

  const icon2 = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z" fill="white"/>
</svg> Отправить`;

  const btnTransfer = el('button.btn btn-primary btn-custom btn-transfer');
  btnTransfer.insertAdjacentHTML('beforeend', icon2);

  btnTransfer.addEventListener('click', (event) => {
    event.preventDefault();
    transferEvent();
  });

  const cardBase = el('div.balance-container custom-link');

  const cardBaseLink = el('a.balance-link');
  cardBaseLink.href = `?bank=balance-${data.account}`;
  cardBaseLink.id = data.account;

  const balanceText = el('h4.text-custom balance-title', 'Динамика баланса');

  const barchartContainer = el('div.barchart-container');

  const barchart = el('canvas#acquisitions1');
  setChildren(barchartContainer, barchart);

  setChildren(trasferForm, [transferTitle, rowNumber, rowAmount, btnTransfer]);
  setChildren(cardBase, cardBaseLink);
  setChildren(cardBaseLink, [balanceText, barchartContainer]);

  const transactionHistory = renderTransactionHistory(numberOfRecords);

  setChildren(accountBottom, [trasferForm, cardBase, transactionHistory]);
  setChildren(container, [accountTop, accountBottom]);

  const warningSpan = el(
    'span.d-inline warning-span',
    ' - отсутствует движение денежных средств',
  );
  if (data.transactions.length === 0) {
    balanceText.append(warningSpan);
  } else {
    chartForAccount(numberOfMonthsForAccount);
  }

  numberInput.addEventListener('input', () => {
    if (paymentIcon(numberInput.value)) {
      trasferForm.append(paymentIcon(numberInput.value));
    } else if (trasferForm.querySelector('img'))
      trasferForm.querySelector('img').remove();
  });

  loadBalanceEvent();
  backBtn.addEventListener('click', () => {
    window.history.back();
  });
  autocomplete();
}
