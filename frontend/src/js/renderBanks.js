import { el, setChildren } from 'redom';
import mapAPI from './map';

export default function renderBanks() {
  const container = document.querySelector('.main-container');
  container.classList.remove('main-container--start');
  container.innerHTML = '';

  const btnsList = document.querySelector('.nav');
  btnsList.style.display = 'flex';

  if (document.querySelector('.header-btn--active')) {
    document
      .querySelector('.header-btn--active')
      .classList.remove('header-btn--active');
  }

  const navBtn = document.getElementById('ATMs');
  navBtn.classList.add('header-btn--active');

  const banksTop = el('div.account-top');
  const title = el('h2.custom-title account-title', 'Карта банкоматов');
  setChildren(banksTop, title);

  const banksBottom = el(
    'div.account-bottom d-flex flex-wrap justify-content-between',
  );

  const mapContainer = el('div');
  mapContainer.id = 'app';

  setChildren(banksBottom, mapContainer);

  setChildren(container, [banksTop, banksBottom]);

  mapAPI();
}
