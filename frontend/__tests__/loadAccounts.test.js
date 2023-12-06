import getToken from '../src/js/getToken';
import loadAccounts from '../src/js/loadAccounts';

test('Неверный токен, либо отсутствует заголовок с токеном', async () => {
  let data = await getToken('developer', 'skillbox');
  const { token } = data.payload;

  data = await loadAccounts(token);
  expect(data).toHaveProperty('error', '');

  data = await loadAccounts('123456789');
  expect(data).not.toHaveProperty('error', '');

  data = await loadAccounts('');
  expect(data).not.toHaveProperty('error', '');
});
