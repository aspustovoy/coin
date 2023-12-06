import getToken from '../src/js/getToken';
import loadAccounts from '../src/js/loadAccounts';
import loadAccount from '../src/js/loadAccount';

test('Неверный id', async () => {
  let data = await getToken('developer', 'skillbox');
  const { token } = data.payload;

  data = await loadAccounts(token);
  const id = data.payload[0].account;

  data = await loadAccount(id, token);
  expect(data).toHaveProperty('error', '');

  data = await loadAccount('0000000000', token);
  expect(data).not.toHaveProperty('error', '');
});
