import { el } from 'redom';

export default function validateFormAuthorization(element) {
  const invalidText =
    'Не поддерживаются пароли и логины длиной менее 6 символов и с пробелами';
  const ErrorMessageinvalid = el('span.badge bg-danger mt-1', invalidText);
  if (!element.value || /\s/.test(element.value) || element.value.length < 6) {
    element.classList.add('is-invalid');
    if (!element.parentElement.querySelector('span'))
      element.parentElement.append(ErrorMessageinvalid);
    return false;
  }
  if (element.parentElement.querySelector('span'))
    element.parentElement.querySelector('span').remove();
  element.classList.remove('is-invalid');
  return true;
}
