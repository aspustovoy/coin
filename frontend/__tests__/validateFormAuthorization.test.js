import validateFormAuthorization from '../src/js/validateFormAuthorization';

const div = document.createElement('div');
const input = document.createElement('input');
div.append(input);

test('Не поддерживаются пароли и логины длиной менее 6 символов и с пробелами', () => {
  input.value = '12345';
  expect(validateFormAuthorization(input)).toBe(false);
  input.value = '123456 ';
  expect(validateFormAuthorization(input)).toBe(false);
  input.value = '';
  expect(validateFormAuthorization(input)).toBe(false);
  input.value = '123456';
  expect(validateFormAuthorization(input)).toBe(true);
});
