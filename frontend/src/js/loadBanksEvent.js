import loadBanks from './loadBanks';
import renderError from './renderError';
import renderBanks from './renderBanks';
import modalSpiner from './modalSpiner';

export default async function loadBanksEvent() {
  const token = JSON.parse(localStorage.getItem('token'));
  modalSpiner();
  const banksData = await loadBanks(token);

  if (window.socket) window.socket.close();

  if (!banksData.payload) {
    modalSpiner();
    renderError(banksData.error);
  } else {
    modalSpiner();
    localStorage.setItem('banksData', JSON.stringify(banksData.payload));
    renderBanks();
  }
}
