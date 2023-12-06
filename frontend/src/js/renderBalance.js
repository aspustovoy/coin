import { el, setChildren } from 'redom';
import renderTransactionHistory from './renderTransactionHistory';
import chartForAccount from './chartForAccount';
import dragAndDrop from './dragAndDrop';

export default function renderBalance() {
  const data = JSON.parse(localStorage.getItem('accountData'));

  const container = document.querySelector('.main-container');
  container.classList.remove('main-container--start');
  container.innerHTML = '';

  const numberOfRecords = 25;
  const numberOfMonthsForBalance = 12;

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
  const title = el('h2.custom-title account-title', 'История баланса');

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

  const cardBase = el('div.balance-container balance-container--balance drop');
  cardBase.id = 'dd1';

  const balanceText = el('h4.text-custom balance-title', 'Динамика баланса');

  const barchartContainer = el(
    'div.barchart-container barchart-container--balance',
  );

  const barchart = el('canvas#acquisitions2');
  setChildren(barchartContainer, barchart);

  setChildren(cardBase, [balanceText, barchartContainer]);

  const cardBase2 = el('div.balance-container balance-container--balance drop');
  cardBase2.id = 'dd2';

  const balanceText2 = el(
    'h4.text-custom balance-title',
    'Соотношение входящих исходящих транзакций',
  );

  const barchartContainer2 = el(
    'div.barchart-container barchart-container--balance',
  );

  const barchart2 = el('canvas#acquisitions3');
  setChildren(barchartContainer2, barchart2);

  setChildren(cardBase2, [balanceText2, barchartContainer2]);

  const transactionHistory = renderTransactionHistory(numberOfRecords);
  transactionHistory.classList.add('drop');
  transactionHistory.id = 'dd3';

  setChildren(accountBottom, [cardBase, cardBase2, transactionHistory]);

  setChildren(container, [accountTop, accountBottom]);

  const warningSpan = el(
    'span.d-inline warning-span',
    ' - отсутствует движение денежных средств',
  );
  const warningSpan2 = el(
    'span.d-inline warning-span',
    ' - отсутствует движение денежных средств',
  );
  if (data.transactions.length === 0) {
    balanceText.append(warningSpan);
    balanceText2.append(warningSpan2);
  } else {
    chartForAccount(numberOfMonthsForBalance);
  }

  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  dragAndDrop();
}
