import getToken from '../src/js/getToken';
import loadCurrencyAccounts from '../src/js/loadCurrencyAccounts';

test('Неверный токен, либо отсутствует заголовок с токеном', async () => {
  let data = await getToken('developer', 'skillbox');
  const { token } = data.payload;

  data = await loadCurrencyAccounts(token);
  expect(data).toHaveProperty('error', '');

  data = await loadCurrencyAccounts('token');
  expect(data).not.toHaveProperty('error', '');

  data = await loadCurrencyAccounts('');
  expect(data).not.toHaveProperty('error', '');
});
