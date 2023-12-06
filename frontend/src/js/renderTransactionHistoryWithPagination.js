import { el, setChildren } from 'redom';
import paymentIcon from './paymentIcon';

export default function renderTransactionHistoryWithPagination(
  transactionHistory,
  tableBody,
) {
  const data = JSON.parse(localStorage.getItem('accountData'));
  const paginationContainer = el('div.pagination-container');
  paginationContainer.id = 'pagination-container';
  transactionHistory.append(paginationContainer);

  const numberPerPage = 25;
  let pageNumber = 0;
  const numberOfPages = Math.ceil(data.transactions.length / numberPerPage) - 1;

  const btnPrevious = el(
    'button.btn btn-primary btn-custom btn-previous',
    'Пред. страница',
  );
  const btnNext = el(
    'button.btn btn-primary btn-custom btn-Next',
    'След. страница',
  );
  setChildren(paginationContainer, [btnPrevious, btnNext]);

  function renderPage() {
    const end = data.transactions.length - pageNumber * numberPerPage;
    let start = end - numberPerPage;
    if (start < 0) start = 0;

    btnPrevious.removeAttribute('disabled');
    btnNext.removeAttribute('disabled');

    if (pageNumber === 0) btnPrevious.setAttribute('disabled', '');

    if (pageNumber === numberOfPages) btnNext.setAttribute('disabled', '');

    tableBody.innerHTML = '';
    const paginatedData = data.transactions.slice(start, end);

    for (let i = paginatedData.length - 1; i >= 0; i--) {
      const tableBodyRow = el('tr.table-body-row');
      const tableBodyCell1 = el(
        'td.col-title-body col-title-body--1',
        paginatedData[i].from.slice(-12),
      );
      if (paymentIcon(paginatedData[i].from))
        tableBodyCell1.append(paymentIcon(paginatedData[i].from));

      const tableBodyCell2 = el(
        'td.col-title-body col-title-body--2',
        paginatedData[i].to.slice(-12),
      );
      if (paymentIcon(paginatedData[i].to))
        tableBodyCell2.append(paymentIcon(paginatedData[i].to));

      let tableBodyCell3 = '';
      if (paginatedData[i].to === data.account) {
        tableBodyCell3 = el(
          'td.col-title-body col-title-body--green',
          `
    + ${Math.floor(paginatedData[i].amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`,
        );
      } else {
        tableBodyCell3 = el(
          'td.col-title-body col-title-body--red',
          `
    - ${Math.floor(paginatedData[i].amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`,
        );
      }

      const dateStr = new Date(paginatedData[i].date).toLocaleString(
        'default',
        {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        },
      );

      const tableBodyCell4 = el('td.col-title-body col-title-body--4', dateStr);
      setChildren(tableBodyRow, [
        tableBodyCell1,
        tableBodyCell2,
        tableBodyCell3,
        tableBodyCell4,
      ]);

      tableBody.append(tableBodyRow);
    }
  }
  renderPage();

  btnNext.addEventListener('click', () => {
    pageNumber++;
    renderPage();
  });

  btnPrevious.addEventListener('click', () => {
    pageNumber--;
    renderPage();
  });
}
