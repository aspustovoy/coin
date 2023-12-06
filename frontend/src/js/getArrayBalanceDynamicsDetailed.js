export default function getArrayBalanceDynamicsDetailed() {
  const data = JSON.parse(localStorage.getItem('accountData'));

  const transactionsDataByMonth = [];
  let transactionsData = [];

  if (data.transactions.length > 0) {
    let month = new Date(data.transactions[0].date).toLocaleString('default', {
      month: 'numeric',
      year: 'numeric',
    });
    let to = 0;
    let from = 0;

    // вся информация по движению средств по месяцам
    for (let i = 0; i < data.transactions.length; i++) {
      const thisMount = new Date(data.transactions[i].date).toLocaleString(
        'default',
        { month: 'numeric', year: 'numeric' },
      );

      if (thisMount === month) {
        if (data.transactions[i].to === data.account) {
          to += data.transactions[i].amount;
        } else {
          from += data.transactions[i].amount;
        }
      } else {
        transactionsDataByMonth.push({
          month,
          from: Math.floor(from),
          to: Math.floor(to),
        });
        month = thisMount;
        to = 0;
        from = 0;
        if (data.transactions[i].to === data.account) {
          to += data.transactions[i].amount;
        } else {
          from += data.transactions[i].amount;
        }
      }
      if (i === data.transactions.length - 1) {
        transactionsDataByMonth.push({
          month,
          from: Math.floor(from),
          to: Math.floor(to),
        });
      }
    }

    // добавляем последние шесть месяцев с текущей даты
    let count = 0;
    for (let i = 0; i < 12; i++) {
      const d = new Date();
      // eslint-disable-next-line no-unused-vars
      const f = d.setMonth(d.getMonth() - count);
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
          from: '',
          to: '',
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
    let flag = false;
    for (let i = 0; i < transactionsDataByMonth.length; i++) {
      if (transactionsDataByMonth[i].to || transactionsDataByMonth[i].from)
        flag = true;
      if (
        !transactionsDataByMonth[i].to &&
        !transactionsDataByMonth[i].from &&
        flag
      ) {
        transactionsDataByMonth[i].to = 0;
        transactionsDataByMonth[i].from = 0;
      }
    }

    // убрать пустые значения
    const newtransactionsDataByMonth = transactionsDataByMonth.filter(
      (e) => e.to !== '' || e.from !== '',
    );

    // удалить дубликаты из массива
    transactionsData = newtransactionsDataByMonth
      .map(JSON.stringify)
      .filter((e, i, a) => i === a.indexOf(e))
      .map(JSON.parse);

    // удалить все кроме 6 месяцев
    transactionsData.splice(0, transactionsData.length - 12);

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
