import { el } from 'redom';

export default function validateFormExchangeCurrency(
  element,
  codeFrom,
  codeTo,
) {
  let invalidText;
  let from;
  let to;
  if (codeFrom && codeTo) {
    invalidText =
      'Поддерживаются только положительные значения, поле должно быть заполнено, валюты должны отличаться';
    from = codeFrom;
    to = codeTo;
  } else {
    invalidText =
      'Поддерживаются только положительные значения, поле должно быть заполнено';
    from = 1;
    to = 0;
  }
  const ErrorMessageinvalid = el('span.badge bg-danger mt-1', invalidText);
  if (element.value <= 0 || !element.value || from === to) {
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
