import router from '../index';
import modalSpiner from './modalSpiner';
import loadAccount from './loadAccount';
import renderBalance from './renderBalance';
import renderError from './renderError';

export default async function loadBalanceEvent(data) {
  const token = JSON.parse(localStorage.getItem('token'));

  if (data) {
    modalSpiner();
    const accountData = await loadAccount(data, token);

    if (!accountData.payload) {
      modalSpiner();
      renderError(accountData.error);
    } else {
      modalSpiner();
      localStorage.setItem('accountData', JSON.stringify(accountData.payload));
      renderBalance();
    }
  } else {
    const btnsBalance = document.querySelectorAll('.balance-link');
    btnsBalance.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        event.preventDefault();
        router.navigate(`/balance/${btn.id}`);
      });
    });
  }
}
