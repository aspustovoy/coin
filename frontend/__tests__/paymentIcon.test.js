import paymentIcon from '../src/js/paymentIcon';

test('Номер карты не относится к платежной системе VISA или MASTERCARD', () => {
  const visa = '4200000000000000';
  expect(paymentIcon(visa)).not.toBe(null);

  const mastercard = '5496198584584769';
  expect(paymentIcon(mastercard)).not.toBe(null);

  let number = '0000000000000000';
  expect(paymentIcon(number)).toBe(null);

  number = '';
  expect(paymentIcon(number)).toBe(null);
});
