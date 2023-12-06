import validateFormExchangeCurrency from './validateFormExchangeCurrency';
import transferFunds from './loadTransferFunds';
import renderError from './renderError';
import renderAccount from './renderAccount';
import modalSpiner from './modalSpiner';

export default async function transferEvent() {
  const token = JSON.parse(localStorage.getItem('token'));

  let coinAccounts = localStorage.getItem('coin');
  if (coinAccounts) {
    coinAccounts = JSON.parse(localStorage.getItem('coin'));
  } else coinAccounts = [];

  const data = JSON.parse(localStorage.getItem('accountData'));

  const to = document.getElementById('to');
  const amount = document.getElementById('amount');

  const inputs = document.querySelectorAll('input');
  inputs.forEach((el) => validateFormExchangeCurrency(el));

  if (!document.querySelector('.is-invalid')) {
    modalSpiner();
    const accountData = await transferFunds(
      data.account,
      to.value,
      amount.value,
      token,
    );
    if (!accountData.payload) {
      modalSpiner();
      renderError(accountData.error);
    } else {
      modalSpiner();
      localStorage.setItem('accountData', JSON.stringify(accountData.payload));
      coinAccounts.push(to.value);

      const uniqueTransactionsData = coinAccounts
        .map(JSON.stringify)
        .filter((e, i, a) => i === a.indexOf(e))
        .map(JSON.parse);
      localStorage.setItem('coin', JSON.stringify(uniqueTransactionsData));
      renderAccount();
    }
  }
}
