import { el, setChildren } from 'redom';
import exchangeCurrencyEvent from './exchangeCurrencyEvent';

export default function renderCurrency() {
  const container = document.querySelector('.main-container');
  container.classList.remove('main-container--start');
  container.innerHTML = '';

  const btnsList = document.querySelector('.nav');
  btnsList.style.display = 'flex';

  if (document.querySelector('.header-btn--active')) {
    document
      .querySelector('.header-btn--active')
      .classList.remove('header-btn--active');
  }

  const navBtn = document.getElementById('Currency');
  navBtn.classList.add('header-btn--active');

  const data = JSON.parse(localStorage.getItem('currencyAccountsData'));
  const { socket } = window;
  const allCurrencies = JSON.parse(localStorage.getItem('allCurrenciesData'));

  const currencyTop = el('div.account-top');
  const title = el('h2.custom-title currency-title', 'Валютный обмен');
  setChildren(currencyTop, title);

  const currencyBottom = el(
    'div.account-bottom d-flex flex-wrap justify-content-between',
  );

  const cardСurrencyAccounts = el('div.currency-accounts-container');
  const currencyAccountsText = el(
    'h4.text-custom currency-accounts-title',
    'Ваши валюты',
  );
  const currencyAccountsContent = el('div.currency-accounts-content');
  setChildren(cardСurrencyAccounts, [
    currencyAccountsText,
    currencyAccountsContent,
  ]);

  const cardExchangeCurrency = el('div.currency-accounts-container');
  const cardExchangeText = el('h4.text-custom xchange-title', 'Обмен валюты');

  const exchangeForm = el('form.exchange-form');
  const formLeft = el('div.form-left');

  const formTop = el('div.d-flex align-items-center form-top');

  const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
    //   <path d="M0.951904 0.5L5.9519 5.5L10.9519 0.5L0.951904 0.5Z" fill="#182233" />
    // </svg>`;

  const spanFrom = el('span.d-inline input-descr input-descr--exchange', 'Из');
  const dropdownContainerFrom = el(
    'div.dropdown-container dropdown-container--exchange',
  );

  const dropdownBtnFrom = el('button.dropdown-btn dropdown-btn--exchange');
  dropdownBtnFrom.id = 'from';
  dropdownBtnFrom.innerHTML = allCurrencies[1] + icon;

  const dropdownContentFrom = el(
    'div.dropdown-content dropdown-content--exchange',
  );

  function createDropdownList(formContainer) {
    const dropdownList = el('ul.dropdown-list');
    setChildren(formContainer, dropdownList);
    allCurrencies.forEach((element) => {
      const dropdownItem = el('li.dropdown-item');
      const dropdownBtn = el('button.dropdown-content-btn', element);
      setChildren(dropdownItem, dropdownBtn);
      dropdownList.append(dropdownItem);
    });
  }

  createDropdownList(dropdownContentFrom);

  dropdownBtnFrom.addEventListener('click', (event) => {
    event.preventDefault();
    dropdownContentFrom.classList.toggle('dropdown-content--visible');
    dropdownBtnFrom.firstElementChild.classList.toggle('svg-rotate');
    const dropdownItems = dropdownBtnFrom.parentElement.querySelectorAll(
      '.dropdown-content-btn',
    );
    dropdownItems.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (dropdownContentFrom.querySelector('.dropdown-btn-active')) {
          dropdownContentFrom
            .querySelector('.dropdown-btn-active')
            .classList.remove('dropdown-btn-active');
        }
        dropdownContentFrom.classList.remove('dropdown-content--visible');
        dropdownBtnFrom.innerHTML = btn.textContent + icon;
        btn.classList.add('dropdown-btn-active');
      });
    });
  });
  window.addEventListener('click', (e) => {
    if (
      !e.target.matches('.dropdown-btn-active') &&
      !e.target.matches('.dropdown-btn') &&
      dropdownContentFrom.classList.contains('dropdown-content--visible')
    ) {
      dropdownContentFrom.classList.toggle('dropdown-content--visible');
      dropdownBtnFrom.firstElementChild.classList.toggle('svg-rotate');
    }
  });
  setChildren(dropdownContainerFrom, [dropdownBtnFrom, dropdownContentFrom]);

  const spanTo = el('span.d-inline input-descr input-descr--exchange', 'в');
  const dropdownContainerTo = el(
    'div.dropdown-container dropdown-container--exchange',
  );

  const dropdownBtnTo = el('button.dropdown-btn dropdown-btn--exchange');
  dropdownBtnTo.id = 'to';
  dropdownBtnTo.innerHTML = allCurrencies[0] + icon;

  const dropdownContentTo = el(
    'div.dropdown-content dropdown-content--exchange',
  );
  setChildren(dropdownContainerTo, [dropdownBtnTo, dropdownContentTo]);

  createDropdownList(dropdownContentTo);

  dropdownBtnTo.addEventListener('click', (event) => {
    event.preventDefault();
    dropdownContentTo.classList.toggle('dropdown-content--visible');
    dropdownBtnTo.firstElementChild.classList.toggle('svg-rotate');
    const dropdownItems = dropdownBtnTo.parentElement.querySelectorAll(
      '.dropdown-content-btn',
    );
    dropdownItems.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (dropdownContentTo.querySelector('.dropdown-btn-active')) {
          dropdownContentTo
            .querySelector('.dropdown-btn-active')
            .classList.remove('dropdown-btn-active');
        }
        dropdownContentTo.classList.remove('dropdown-content--visible');
        dropdownBtnTo.innerHTML = btn.textContent + icon;
        btn.classList.add('dropdown-btn-active');
      });
    });
  });
  window.addEventListener('click', (e) => {
    if (
      !e.target.matches('.dropdown-btn-active') &&
      !e.target.matches('.dropdown-btn') &&
      dropdownContentTo.classList.contains('dropdown-content--visible')
    ) {
      dropdownContentTo.classList.toggle('dropdown-content--visible');
      dropdownBtnTo.firstElementChild.classList.toggle('svg-rotate');
    }
  });

  const formBottom = el(
    'div.input-container--exchange d-flex align-items-center',
  );
  const amountLabel = el('label.input-descr input-descr--exchange', 'Сумма');
  const colAmount = el('div.w-100');
  const amountInput = el('input.form-control form-control--exchange', {
    placeholder: 'Placeholder',
    type: 'number',
  });
  setChildren(colAmount, amountInput);

  setChildren(formTop, [
    spanFrom,
    dropdownContainerFrom,
    spanTo,
    dropdownContainerTo,
  ]);

  const btnSubmit = el(
    'button.btn btn-primary btn-custom btn-exchange',
    'Поменять',
  );

  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    exchangeCurrencyEvent();
  });
  setChildren(formBottom, [amountLabel, colAmount]);
  setChildren(formLeft, [formTop, formBottom]);
  setChildren(exchangeForm, [formLeft, btnSubmit]);
  setChildren(cardExchangeCurrency, [cardExchangeText, exchangeForm]);

  const cardchangedCurrency = el('div.changed-currency-container');
  const changedCurrencyText = el(
    'h4.text-custom changed-currency-title',
    'Изменение курсов в реальном времени',
  );

  const changedCurrencyContent = el('div.currency-accounts-content');
  setChildren(cardchangedCurrency, [
    changedCurrencyText,
    changedCurrencyContent,
  ]);

  if (socket) {
    socket.onmessage = (event) => {
      const changedCurrencyData = JSON.parse(event.data);

      const amountGreen = `${changedCurrencyData.rate} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
      <path d="M20 10L10 0L0 10L20 10Z" fill="#76CA66"/>
      </svg>`;

      const amountRed = `${changedCurrencyData.rate} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
      <path d="M0 0L10 10L20 0H0Z" fill="#FD4E5D"/>
      </svg>`;

      const changedCurrencyRow = el(
        'div.d-flex align-items-center currency-row',
      );
      const changedCurrencyCode = el(
        'span.d-inline currency-code',
        `${changedCurrencyData.from}/${changedCurrencyData.to}`,
      );
      const changedCurrencyBorder = el('div.currency-border');
      const changedCurrencyAmount = el(
        'span.currency-amount currency-amount--changed',
      );

      if (changedCurrencyData.change === 0) {
        changedCurrencyAmount.insertAdjacentHTML(
          'beforeend',
          changedCurrencyData.rate,
        );
      }

      if (changedCurrencyData.change === 1) {
        changedCurrencyAmount.insertAdjacentHTML('beforeend', amountGreen);
        changedCurrencyBorder.classList.add('currency-border--green');
      }

      if (changedCurrencyData.change === -1) {
        changedCurrencyAmount.insertAdjacentHTML('beforeend', amountRed);
        changedCurrencyBorder.classList.add('currency-border--red');
      }

      setChildren(changedCurrencyRow, [
        changedCurrencyCode,
        changedCurrencyBorder,
        changedCurrencyAmount,
      ]);
      changedCurrencyContent.prepend(changedCurrencyRow);

      const count = currencyAccountsContent.childElementCount + 6;
      if (changedCurrencyContent.childElementCount > count) {
        changedCurrencyContent.lastChild.remove();
      }
    };
  }

  const currencyBottomLeft = el('div.currency-left');
  const currencyBottomRight = el('div.currency-right');
  setChildren(currencyBottomRight, cardchangedCurrency);

  for (const key in data) {
    if (Object.hasOwn(data, key)) {
      const currencyRow = el('div.d-flex align-items-center currency-row');
      const correncyCode = el('span.d-inline currency-code', data[key].code);
      const correncyBorder = el('div.currency-border');
      const correncyAmount = el('span.currency-amount', data[key].amount);
      setChildren(currencyRow, [correncyCode, correncyBorder, correncyAmount]);

      if (data[key].amount > 0) currencyAccountsContent.append(currencyRow);
    }
  }

  setChildren(currencyBottom, [currencyBottomLeft, currencyBottomRight]);

  setChildren(currencyBottomLeft, [cardСurrencyAccounts, cardExchangeCurrency]);
  setChildren(container, [currencyTop, currencyBottom]);
}
