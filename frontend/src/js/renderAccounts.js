import { el, setChildren } from 'redom';
import createAccount from './createAccount';
import renderError from './renderError';
import loadAccounts from './loadAccounts';
import loadAccountEvent from './loadAccountEvent';

export default function renderAccounts() {
  const container = document.querySelector('.main-container');
  container.classList.remove('main-container--start');
  container.innerHTML = '';
  const token = JSON.parse(localStorage.getItem('token'));
  let newData = [];
  let accountsData = JSON.parse(localStorage.getItem('accountsData'));

  if (window.socket) window.socket.close();

  if (accountsData) newData = JSON.parse(JSON.stringify(accountsData));

  newData.forEach((e) => {
    if (e.transactions[0]) {
      e.transactions = e.transactions[0].date;
    } else e.transactions = '9999-11-19T14:06:16.751Z';
  });

  const btnsList = document.querySelector('.nav');
  btnsList.style.display = 'flex';

  if (document.querySelector('.header-btn--active')) {
    document
      .querySelector('.header-btn--active')
      .classList.remove('header-btn--active');
  }

  const navBtn = document.getElementById('Accounts');
  navBtn.classList.add('header-btn--active');

  const hero = el('div.hero d-flex flex-wrap');

  const title = el('h2.custom-title accounts-title', 'Ваши счета');

  const icon1 = `Сортировка <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
  //   <path d="M0.951904 0.5L5.9519 5.5L10.9519 0.5L0.951904 0.5Z" fill="#182233" />
  // </svg>`;

  const dropdownContainer = el('div.dropdown-container');

  const dropdownBtn = el('button.dropdown-btn');
  dropdownBtn.insertAdjacentHTML('beforeend', icon1);

  const dropdownContent = el('div. dropdown-content');
  setChildren(dropdownContainer, [dropdownBtn, dropdownContent]);

  const dropdownList = el('ul.dropdown-list');
  setChildren(dropdownContent, dropdownList);

  const icon2 = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_23742_27)">
  <path d="M9.00003 16.17L4.83003 12L3.41003 13.41L9.00003 19L21 7.00003L19.59 5.59003L9.00003 16.17Z" fill="#182233"/>
  </g>
  <defs>
  <clipPath id="clip0_23742_27">
  <rect width="24" height="24" fill="white"/>
  </clipPath>
  </defs>
  </svg>`;

  const dropdownItem1 = el('li.dropdown-item');
  const dropdownBtn1 = el('button.dropdown-content-btn', 'По номеру');
  setChildren(dropdownItem1, dropdownBtn1);

  const dropdownItem2 = el('li.dropdown-item');
  const dropdownBtn2 = el('button.dropdown-content-btn', 'По балансу');
  setChildren(dropdownItem2, dropdownBtn2);

  const dropdownItem3 = el('li.dropdown-item');
  const dropdownBtn3 = el(
    'button.dropdown-content-btn',
    'По последней транзакции',
  );
  setChildren(dropdownItem3, dropdownBtn3);

  setChildren(dropdownList, [dropdownItem1, dropdownItem2, dropdownItem3]);

  const icon3 = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 4.00001L12 12M12 12L12 20M12 12L20 12M12 12L4 12" stroke="white" stroke-width="2" />
  </svg>Создать новый счет`;
  const btnNewAccount = el('button.btn btn-primary btn-custom btn-new-account');

  btnNewAccount.insertAdjacentHTML('beforeend', icon3);
  setChildren(hero, [title, dropdownContainer, btnNewAccount]);

  const accounts = el('div.row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4');
  setChildren(container, [hero, accounts]);

  function renderAccountsList(element, object) {
    for (const account of object) {
      const col = el('div.col');

      const accountCard = el('div.card account-card');
      setChildren(col, accountCard);

      const cardTitle = el('h5.card-title', account.account);
      const cardText = el(
        'p.card-text',
        `${Math.floor(account.balance)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`,
      );

      const cardBody = el('div.card-body');

      const cardBodyText = el('div.card-body-text');

      const bodyTitle = el('h6.body-title', 'Последняя транзакция:');

      let dateStr = 'Транзакции отсутствуют';
      if (
        account.transactions &&
        account.transactions !== '9999-11-19T14:06:16.751Z'
      ) {
        const options = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        };
        dateStr = new Date(account.transactions).toLocaleString(
          'default',
          options,
        );
      }

      const descr = el('p.card-text', dateStr);

      setChildren(cardBodyText, [bodyTitle, descr]);

      const cardBtn = el('a.btn btn-primary btn-custom btn-account', 'Открыть');
      cardBtn.href = `?bank=account-${account.account}`;
      cardBtn.id = account.account;
      setChildren(cardBody, [cardBodyText, cardBtn]);

      setChildren(accountCard, [cardTitle, cardText, cardBody]);

      element.append(col);
    }
  }

  renderAccountsList(accounts, newData);

  btnNewAccount.addEventListener('click', async () => {
    const newAccount = await createAccount(token);
    if (newAccount) {
      accountsData = await loadAccounts(token);
      if (!accountsData.payload) {
        renderError(accountsData.error);
      } else {
        localStorage.setItem(
          'accountsData',
          JSON.stringify(accountsData.payload),
        );
        renderAccounts();
      }
    }
  });

  window.addEventListener('click', (e) => {
    if (
      !e.target.matches('.dropdown-btn-active') &&
      !e.target.matches('.dropdown-btn') &&
      dropdownContent.classList.contains('dropdown-content--visible')
    ) {
      dropdownContent.classList.toggle('dropdown-content--visible');
      dropdownBtn.firstElementChild.classList.toggle('svg-rotate');
    }
  });

  dropdownBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('dropdown-content--visible');
    dropdownBtn.firstElementChild.classList.toggle('svg-rotate');
  });

  function sortAndRenderObjectByFieldName(object, fieldName, element) {
    element.innerHTML = '';

    function byField(name) {
      return (a, b) => (a[name] > b[name] ? 1 : -1);
    }

    renderAccountsList(element, object.sort(byField(fieldName)));
    loadAccountEvent();
  }

  function renderIconSort(btn) {
    if (dropdownContent.querySelector('.dropdown-btn-active')) {
      dropdownContent
        .querySelector('.dropdown-btn-active')
        .classList.remove('dropdown-btn-active');
    }

    if (dropdownContent.querySelectorAll('svg'))
      dropdownContent.querySelectorAll('svg').forEach((e) => e.remove());
    btn.insertAdjacentHTML('beforeend', icon2);
    btn.classList.add('dropdown-btn-active');
  }

  dropdownBtn1.addEventListener('click', () => {
    renderIconSort(dropdownBtn1);
    sortAndRenderObjectByFieldName(newData, 'account', accounts);
  });

  dropdownBtn2.addEventListener('click', () => {
    renderIconSort(dropdownBtn2);
    sortAndRenderObjectByFieldName(newData, 'balance', accounts);
  });

  dropdownBtn3.addEventListener('click', () => {
    renderIconSort(dropdownBtn3);
    sortAndRenderObjectByFieldName(newData, 'transactions', accounts);
  });

  loadAccountEvent();
}
