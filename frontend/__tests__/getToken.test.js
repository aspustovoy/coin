import getToken from '../src/js/getToken';

test('Пытаемся войти с неверным паролем, либо пользователя с таким логином не существует', async () => {
  let data = await getToken('developer', 'skillbox');
  expect(data).toHaveProperty('error', '');

  data = await getToken('123456', 'skillbox');
  expect(data).not.toHaveProperty('error', '');

  data = await getToken('developer', '123456');
  expect(data).not.toHaveProperty('error', '');

  data = await getToken('123456', '123456');
  expect(data).not.toHaveProperty('error', '');
});
