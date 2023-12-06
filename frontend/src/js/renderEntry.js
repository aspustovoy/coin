import { el, setChildren } from 'redom';
import navigationEvent from './navigationEvent';

export default function renderEntry() {
  const token = JSON.parse(localStorage.getItem('token'));

  if (window.socket) window.socket.close();

  if (document.querySelector('.header-btn--active')) {
    document
      .querySelector('.header-btn--active')
      .classList.remove('header-btn--active');
  }

  const header = el('header.header');
  const main = el('main.main');
  setChildren(window.document.body, [header, main]);

  const modals = el('div.modals');
  const modalOverlay = el('div.modal-overlay');
  const modal = el('div.modal1');
  const spinnerBorder = el('div.spinner-border');

  setChildren(modals, modalOverlay);
  setChildren(modalOverlay, modal);
  setChildren(modal, spinnerBorder);

  const headerContainer = el('div.container');
  setChildren(header, headerContainer);
  const mainContainer = el(
    'div.container main-container main-container--start',
  );
  mainContainer.innerHTML = '';
  const errorContainer = el('div. error-container');
  setChildren(main, mainContainer, errorContainer);

  const headerContent = el(
    'div.d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between',
  );
  setChildren(headerContainer, [headerContent, modals]);

  const btns = el(
    'ul.nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0',
    { style: { display: 'none' } },
  );
  const btnATMs = el('button.header-btn', 'Банкоматы');
  btnATMs.id = 'ATMs';
  const itemBtn1 = el('li.nav-item');
  setChildren(itemBtn1, btnATMs);

  const btnAccounts = el('button.header-btn', 'Счета');
  btnAccounts.id = 'Accounts';
  const itemBtn2 = el('li.nav-item');
  setChildren(itemBtn2, btnAccounts);

  const btnCurrency = el('button.header-btn', 'Валюта');
  btnCurrency.id = 'Currency';
  const itemBtn3 = el('li.nav-item');
  setChildren(itemBtn3, btnCurrency);

  const btnExit = el('button.header-btn', 'Выход');
  btnExit.id = 'Exit';
  const itemBtn4 = el('li.nav-item');
  setChildren(itemBtn4, btnExit);

  setChildren(btns, [itemBtn1, itemBtn2, itemBtn3, itemBtn4]);

  const logo = el(
    'a.logo text-decoration-none d-flex align-items-center',
    'Coin.',
  );
  setChildren(headerContent, [logo, btns]);

  const authorizationForm = el('form.authorization-form');

  if (!token) {
    setChildren(mainContainer, authorizationForm);
  } else setChildren(mainContainer);

  const authorizationTitle = el(
    'h2.custom-title authorization-title',
    'Вход в аккаунт',
  );
  const rowlogin = el('div.input-container d-flex align-items-center');
  const loginLabel = el('label.input-descr', 'Логин');
  const colLogin = el('div.w-100');
  const loginInput = el('input.form-control', {
    placeholder: 'Placeholder',
    name: 'username',
  });
  setChildren(colLogin, loginInput);
  setChildren(rowlogin, [loginLabel, colLogin]);

  const rowPass = el('div.input-container d-flex align-items-center');
  const passLabel = el('label.input-descr', 'Пароль');
  const colPass = el('div.w-100');
  const passInput = el('input.form-control', {
    placeholder: 'Placeholder',
    name: 'password',
    type: 'password',
  });
  setChildren(colPass, passInput);
  setChildren(rowPass, [passLabel, colPass]);

  const btnSubmit = el('button.btn btn-primary btn-submit', 'Войти');

  setChildren(authorizationForm, [
    authorizationTitle,
    rowlogin,
    rowPass,
    btnSubmit,
  ]);

  navigationEvent();
  return btnSubmit;
}
