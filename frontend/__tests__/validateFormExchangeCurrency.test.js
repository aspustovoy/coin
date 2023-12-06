import validateFormExchangeCurrency from '../src/js/validateFormExchangeCurrency';

const div = document.createElement('div');
const input = document.createElement('input');
div.append(input);

test('Поддерживаются только положительные значения, поле должно быть заполнено', () => {
  input.value = '0';
  expect(validateFormExchangeCurrency(input, 'BTC', 'ETH')).toBe(false);
  input.value = '-1';
  expect(validateFormExchangeCurrency(input, 'BTC', 'ETH')).toBe(false);
  input.value = '';
  expect(validateFormExchangeCurrency(input, 'BTC', 'ETH')).toBe(false);
  input.value = '1';
  expect(validateFormExchangeCurrency(input, 'BTC', 'ETH')).toBe(true);
});
