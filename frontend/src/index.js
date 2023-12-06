import 'babel-polyfill';
import './scss/main.scss';
import Navigo from 'navigo';
import renderEntry from './js/renderEntry';
import authorizationEvent from './js/authorizationEvent';
import loadBanksEvent from './js/loadBanksEvent';
import checkAutorization from './js/checkAutorization';
import loadCurrencyAccountsEvent from './js/loadCurrencyAccountsEvent';
import renderError from './js/renderError';
import loadAccountEvent from './js/loadAccountEvent';
import loadBalanceEvent from './js/loadBalanceEvent';
import loadAccountsEvent from './js/loadAccountsEvent';

const router = new Navigo('/');
const offline = 'Произошла ошибка, проверьте подключение к интернету';
const online = 'Подключиние к интернету установлено';

window.addEventListener('offline', () => {
  renderError(offline);
});

window.addEventListener('online', () => {
  renderError(online);
});

router.on('/', () => {
  const btnSubmit = renderEntry();
  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    authorizationEvent();
  });
});
router.on('/accounts', () => {
  checkAutorization(loadAccountsEvent);
});
router.on('/account/:id', ({ data: { id } }) => {
  checkAutorization(loadAccountEvent, id);
});
router.on('/balance/:id', ({ data: { id } }) => {
  checkAutorization(loadBalanceEvent, id);
});
router.on('/addresses', () => {
  checkAutorization(loadBanksEvent);
});
router.on('/currency', () => {
  checkAutorization(loadCurrencyAccountsEvent);
});
router.resolve();

export default router;
