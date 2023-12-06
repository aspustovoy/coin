import validateFormExchangeCurrency from './validateFormExchangeCurrency';
import exchangeCurrency from './loadExchangeCurrency';
import renderError from './renderError';
import renderCurrency from './renderCurrency';
import modalSpiner from './modalSpiner';

export default async function exchangeCurrencyEvent() {
  const token = JSON.parse(localStorage.getItem('token'));
  const btnFrom = document.getElementById('from');
  const btnTo = document.getElementById('to');
  const input = document.querySelector('.form-control');

  validateFormExchangeCurrency(input, btnFrom.innerText, btnTo.innerText);

  if (!document.querySelector('.is-invalid')) {
    modalSpiner();
    const exchangeCurrencyData = await exchangeCurrency(
      btnFrom.innerText,
      btnTo.innerText,
      input.value,
      token,
    );

    if (!exchangeCurrencyData.payload) {
      modalSpiner();
      renderError(exchangeCurrencyData.error);
    } else {
      modalSpiner();
      localStorage.setItem(
        'currencyAccountsData',
        JSON.stringify(exchangeCurrencyData.payload),
      );
      renderCurrency();
    }
  }
}
