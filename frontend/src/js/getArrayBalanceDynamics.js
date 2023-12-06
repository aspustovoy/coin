export default function getArrayBalanceDynamics(numberOfMonths) {
  const data = JSON.parse(localStorage.getItem('accountData'));

  const transactionsDataByMonth = [];
  let transactionsData = [];

  if (data.transactions.length > 0) {
    let month = new Date(
      data.transactions[data.transactions.length - 1].date,
    ).toLocaleString('default', { month: 'numeric' });
    let amount = data.balance;
    transactionsDataByMonth.push({
      month: new Date(
        data.transactions[data.transactions.length - 1].date,
      ).toLocaleString('default', {
        year: 'numeric',
        month: 'numeric',
      }),
      balance: Math.floor(amount),
    });

    // вся информация по движению средств по месяцам
    for (let i = data.transactions.length - 1; i >= 0; i--) {
      const thisMount = new Date(data.transactions[i].date).toLocaleString(
        'default',
        { month: 'numeric' },
      );

      if (thisMount !== month) {
        month = thisMount;
        transactionsDataByMonth.push({
          month: new Date(data.transactions[i].date).toLocaleString('default', {
            month: 'numeric',
            year: 'numeric',
          }),
          balance: Math.floor(amount),
        });
      }
      if (data.transactions[i].to === data.account) {
        amount -= data.transactions[i].amount;
      } else {
        amount += data.transactions[i].amount;
      }
    }

    // баланс на текущую дату
    transactionsDataByMonth.push({
      month: new Date().toLocaleString('default', {
        month: 'numeric',
        year: 'numeric',
      }),
      balance: Math.floor(data.balance),
    });

    // добавляем последние шесть месяцев с текущей даты
    let count = 0;
    for (let i = 0; i < numberOfMonths; i++) {
      const d = new Date();
      // eslint-disable-next-line no-unused-vars
      const from = d.setMonth(d.getMonth() - count);
      count++;
      if (
        !transactionsDataByMonth
          .map((e) => e.month)
          .includes(
            d.toLocaleString('default', {
              month: 'numeric',
              year: 'numeric',
            }),
          )
      ) {
        transactionsDataByMonth.push({
          month: d.toLocaleString('default', {
            month: 'numeric',
            year: 'numeric',
          }),
          balance: '',
        });
      }
    }
    // сформировать строку типа год месяц
    transactionsDataByMonth.forEach((e) => {
      const a = e.month.split('.');
      e.month = a[1].concat(a[0]);
    });

    // сортировка по возрастанию по значению ключа - месяц
    transactionsDataByMonth.sort((a, b) => (a.month > b.month ? 1 : -1));

    // заполнение пустых значений
    for (let i = 0; i < transactionsDataByMonth.length; i++) {
      if (!transactionsDataByMonth[i].balance) {
        if (transactionsDataByMonth[i - 1]) {
          transactionsDataByMonth[i].balance =
            transactionsDataByMonth[i - 1].balance;
        }
      }
    }

    // убрать пустые значения
    const newtransactionsDataByMonth = transactionsDataByMonth.filter(
      (e) => e.balance !== '',
    );

    // удалить дубликаты из массива
    transactionsData = newtransactionsDataByMonth
      .map(JSON.stringify)
      .filter((e, i, a) => i === a.indexOf(e))
      .map(JSON.parse);

    // удалить все кроме 6 месяцев
    transactionsData.splice(0, transactionsData.length - numberOfMonths);

    // 3 буквы названия месяца
    transactionsData.forEach((e) => {
      e.month = new Date(e.month.slice(-2))
        .toLocaleString('default', {
          month: 'short',
        })
        .slice(0, 3);
    });
  }

  return transactionsData;
}
