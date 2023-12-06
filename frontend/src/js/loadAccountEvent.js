import loadAccount from './loadAccount';
import renderError from './renderError';
import renderAccount from './renderAccount';
import modalSpiner from './modalSpiner';
import router from '../index';

export default async function loadAccountEvent(data) {
  const btnsAccount = document.querySelectorAll('.btn-account');
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
      renderAccount();
    }
  } else {
    btnsAccount.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        event.preventDefault();

        modalSpiner();

        const accountData = await loadAccount(btn.id, token);

        if (!accountData.payload) {
          modalSpiner();
          renderError(accountData.error);
        } else {
          modalSpiner();
          router.navigate(`/account/${btn.id}`);
          localStorage.setItem(
            'accountData',
            JSON.stringify(accountData.payload),
          );
        }
      });
    });
  }
}
