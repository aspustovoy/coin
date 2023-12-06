import loadAccounts from './loadAccounts';
import renderError from './renderError';
import renderAccounts from './renderAccounts';
import modalSpiner from './modalSpiner';

export default async function loadAccountsEvent() {
  const token = JSON.parse(localStorage.getItem('token'));

  modalSpiner();
  if (window.socket) window.socket.close();

  const accountsData = await loadAccounts(token);
  if (!accountsData.payload) {
    modalSpiner();
    renderError(accountsData.error);
  } else {
    modalSpiner();
    localStorage.setItem('accountsData', JSON.stringify(accountsData.payload));
    renderAccounts();
  }
}
