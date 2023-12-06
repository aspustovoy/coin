import loadCurrencyAccounts from './loadCurrencyAccounts';
import renderError from './renderError';
import renderCurrency from './renderCurrency';
import getChangedCurrency from './getChangedCurrency';
import loadAllCurrencies from './loadAllCurrencies';
import modalSpiner from './modalSpiner';

export default async function loadCurrencyAccountsEvent() {
  const token = JSON.parse(localStorage.getItem('token'));

  modalSpiner();
  const currencyAccountsData = await loadCurrencyAccounts(token);
  window.socket = await getChangedCurrency();

  const allCurrencies = await loadAllCurrencies(token);

  if (!currencyAccountsData.payload) {
    modalSpiner();
    renderError(currencyAccountsData.error);
  } else if (allCurrencies) {
    modalSpiner();
    localStorage.setItem(
      'allCurrenciesData',
      JSON.stringify(allCurrencies.payload),
    );
    localStorage.setItem(
      'currencyAccountsData',
      JSON.stringify(currencyAccountsData.payload),
    );
    renderCurrency();
  } else {
    modalSpiner();
    renderError(allCurrencies.error);
  }
}
