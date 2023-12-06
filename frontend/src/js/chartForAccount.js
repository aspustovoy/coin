import Chart from 'chart.js/auto';
import getArrayBalanceDynamics from './getArrayBalanceDynamics';
import getArrayBalanceDynamicsDetailed from './getArrayBalanceDynamicsDetailed';

export default function chartForAccount(numberOfMonths) {
  const period = numberOfMonths;
  const transactionsData = getArrayBalanceDynamics(period);
  const transactionsDataDetailed = getArrayBalanceDynamicsDetailed();

  const optionCallback = numberOfMonths === 6 ? '' : '  ₽';
  const stepMax = Math.max(
    Math.max.apply(
      null,
      transactionsDataDetailed.map((number) => number.to),
    ),
    Math.max.apply(
      null,
      transactionsDataDetailed.map((number) => number.from),
    ),
  );

  const stepMin = Math.min(
    Math.max.apply(
      null,
      transactionsDataDetailed.map((number) => number.to),
    ),
    Math.max.apply(
      null,
      transactionsDataDetailed.map((number) => number.from),
    ),
  );

  const onePosition = Math.abs(stepMin - (stepMax / 4) * 1);
  const twoPosition = Math.abs(stepMin - (stepMax / 4) * 2);
  const threePosition = Math.abs(stepMin - (stepMax / 4) * 3);
  let min;

  switch (Math.min(onePosition, twoPosition, threePosition)) {
    case onePosition:
      min = (stepMax / 4) * 1;
      break;
    case twoPosition:
      min = (stepMax / 4) * 2;
      break;
    case threePosition:
      min = (stepMax / 4) * 3;
      break;
    default:
  }

  const chartAreaBorder = {
    id: 'chartAreaBorder',

    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;

      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 2,
    },
    hover: false,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      chartAreaBorder: {
        borderColor: '#000',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000',
          font: {
            size: 20,
            style: 'normal',
            weight: 700,
            lineHeight: 'normal',
          },
        },
        grid: {
          color: 'transparent',
        },
      },
      y: {
        position: 'right',
        ticks: {
          callback: (value) => value + optionCallback,
          stepSize: Math.max.apply(
            null,
            transactionsData.map((number) => number.balance),
          ),
          color: '#000',

          font: {
            size: 20,
            style: 'normal',
            weight: 500,
            lineHeight: 'normal',
          },
          align: 'start',
        },
        grid: {
          color: 'transparent',
        },
      },
    },
  };

  if (document.getElementById('acquisitions1')) {
    // eslint-disable-next-line no-unused-vars
    const myChart1 = new Chart(document.getElementById('acquisitions1'), {
      type: 'bar',
      options,
      data: {
        labels: transactionsData.map((row) => row.month),
        datasets: [
          {
            data: transactionsData.map((row) => row.balance),
            backgroundColor: '#116ACC',
            barThickness: 50,
          },
        ],
      },
      plugins: [chartAreaBorder],
    });
  }
  if (document.getElementById('acquisitions2')) {
    // eslint-disable-next-line no-unused-vars
    const myChart2 = new Chart(document.getElementById('acquisitions2'), {
      type: 'bar',
      options,
      data: {
        labels: transactionsData.map((row) => row.month),
        datasets: [
          {
            data: transactionsData.map((row) => row.balance),
            backgroundColor: '#116ACC',
            barThickness: 50,
          },
        ],
      },
      plugins: [chartAreaBorder],
    });
  }
  if (document.getElementById('acquisitions3')) {
    // eslint-disable-next-line no-unused-vars
    const myChart3 = new Chart(document.getElementById('acquisitions3'), {
      type: 'bar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 2,
        },
        hover: false,
        animation: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
          chartAreaBorder: {
            borderColor: '#000',
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: '#000',
              font: {
                size: 20,
                style: 'normal',
                weight: 700,
                lineHeight: 'normal',
              },
            },
            grid: {
              color: 'transparent',
            },
          },
          y: {
            max: stepMax,
            position: 'right',
            ticks: {
              stepSize: min,
              callback(value) {
                if (value === stepMax || value === 0) {
                  return ` ${value}  ₽`;
                }
                if (value === min && stepMin !== 0) {
                  return ` ${stepMin}  ₽`;
                }
                return null;
              },
              color: '#000',
              font: {
                size: 20,
                style: 'normal',
                weight: 500,
                lineHeight: 'normal',
              },
              align: 'start',
            },
            grid: {
              color: 'transparent',
            },
          },
        },
      },
      data: {
        labels: transactionsDataDetailed.map((row) => row.month),
        datasets: [
          {
            data: transactionsDataDetailed.map((row) => row.to),
            order: 1,
            backgroundColor: '#76CA66',
            barThickness: 50,
          },
          {
            data: transactionsDataDetailed.map((row) => row.from),
            backgroundColor: '#FD4E5D',
            barThickness: 50,
          },
        ],
      },
      plugins: [chartAreaBorder],
    });
  }
}
