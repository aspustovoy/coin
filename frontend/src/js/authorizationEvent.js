import validateFormAuthorization from './validateFormAuthorization';
import getToken from './getToken';
import renderError from './renderError';
import loadAccounts from './loadAccounts';
import modalSpiner from './modalSpiner';
import router from '../index';
import renderAccounts from './renderAccounts';

export default async function authorizationEvent() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach((el) => validateFormAuthorization(el));

  if (!document.querySelector('.is-invalid')) {
    modalSpiner();
    const autorizationData = await getToken(inputs[0].value, inputs[1].value);

    if (!autorizationData.payload) {
      modalSpiner();
      renderError(autorizationData.error);
    } else {
      const { token } = autorizationData.payload;
      localStorage.setItem('token', JSON.stringify(token));
      const accountsData = await loadAccounts(token);
      if (!accountsData.payload) {
        modalSpiner();
        renderError(accountsData.error);
      } else {
        modalSpiner();
        router.navigate('/accounts');
        localStorage.setItem(
          'accountsData',
          JSON.stringify(accountsData.payload),
        );
        renderAccounts();
      }
    }
  }
}
