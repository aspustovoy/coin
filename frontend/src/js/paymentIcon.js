import { isValid, getCreditCardNameByNumber } from 'creditcard.js';
import { el } from 'redom';
import mastercard from '../assets/images/mastercard.png';
import visa from '../assets/images/visa.png';

export default function paymentIcon(value) {
  const MastercardLogo = el('img', {
    src: mastercard,
    alt: 'Логотип платежной системы',
  });
  const VisaLogo = el('img', { src: visa, alt: 'Логотип платежной системы' });

  if (isValid(value)) {
    const card = getCreditCardNameByNumber(value);

    switch (card) {
      case 'Visa':
        return VisaLogo;
      case 'Mastercard':
        return MastercardLogo;
      default:
        return null;
    }
  } else return null;
}
