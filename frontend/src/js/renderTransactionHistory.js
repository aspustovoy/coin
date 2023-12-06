import { el, setChildren } from 'redom';
import renderTransactionHistoryWithPagination from './renderTransactionHistoryWithPagination';
import paymentIcon from './paymentIcon';

export default function renderTransactionHistory(numberOfRecords) {
  const data = JSON.parse(localStorage.getItem('accountData'));

  const transactionHistory = el('div.transaction-history');
  const transactionHistoryTitle = el(
    'h4.text-custom transaction-history-title',
    'История переводов',
  );

  const table = el('table.table-custom');
  const tableHead = el('thead.table-head');
  const tableHeadRow = el('tr.table-head-row');
  setChildren(tableHead, tableHeadRow);
  const tableHeadCell1 = el('th.col-title col-title--1', 'Счёт отправителя');
  const tableHeadCell2 = el('th.col-title col-title--2', 'Счёт получателя');
  const tableHeadCell3 = el('th.col-title col-title--3', 'Сумма');
  const tableHeadCell4 = el('th.col-title col-title--4', 'Дата');
  setChildren(tableHeadRow, [
    tableHeadCell1,
    tableHeadCell2,
    tableHeadCell3,
    tableHeadCell4,
  ]);

  const tableBody = el('tbody.data-container');
  setChildren(table, [tableHead, tableBody]);

  if (data.transactions.length > 0) {
    if (numberOfRecords === 25 && data.transactions.length > 25) {
      renderTransactionHistoryWithPagination(transactionHistory, tableBody);
    } else {
      let count = data.transactions.length - numberOfRecords;
      if (data.transactions.length < numberOfRecords) count = 0;
      for (let i = data.transactions.length - 1; i >= count; i--) {
        const tableBodyRow = el('tr.table-body-row');
        const tableBodyCell1 = el(
          'td.col-title-body col-title-body--1',
          data.transactions[i].from.slice(-12),
        );
        if (paymentIcon(data.transactions[i].from))
          tableBodyCell1.append(paymentIcon(data.transactions[i].from));

        const tableBodyCell2 = el(
          'td.col-title-body col-title-body--2',
          data.transactions[i].to.slice(-12),
        );
        if (paymentIcon(data.transactions[i].to))
          tableBodyCell2.append(paymentIcon(data.transactions[i].to));

        let tableBodyCell3 = '';
        if (data.transactions[i].to === data.account) {
          tableBodyCell3 = el(
            'td.col-title-body col-title-body--green',
            `
        + ${Math.floor(data.transactions[i].amount)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`,
          );
        } else {
          tableBodyCell3 = el(
            'td.col-title-body col-title-body--red',
            `
        - ${Math.floor(data.transactions[i].amount)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`,
          );
        }

        const dateStr = new Date(data.transactions[i].date).toLocaleString(
          'default',
          {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          },
        );

        const tableBodyCell4 = el(
          'td.col-title-body col-title-body--4',
          dateStr,
        );
        setChildren(tableBodyRow, [
          tableBodyCell1,
          tableBodyCell2,
          tableBodyCell3,
          tableBodyCell4,
        ]);

        tableBody.append(tableBodyRow);
      }
    }
  }

  if (numberOfRecords !== 25) {
    const transactionHistoryLink = el('a.balance-link');
    transactionHistoryLink.href = `?bank=balance-${data.account}`;
    transactionHistoryLink.id = data.account;
    transactionHistory.classList.add('custom-link');

    setChildren(transactionHistoryLink, [transactionHistoryTitle, table]);
    setChildren(transactionHistory, transactionHistoryLink);
  } else {
    transactionHistory.prepend(table);
    transactionHistory.prepend(transactionHistoryTitle);
  }
  return transactionHistory;
}
