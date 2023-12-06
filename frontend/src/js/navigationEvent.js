import router from '../index';

export default function navigationEvent() {
  const navBtns = document.querySelectorAll('.header-btn');
  let token;
  navBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      switch (e.target.id) {
        case 'ATMs':
          router.navigate('/addresses');
          break;
        case 'Accounts':
          router.navigate('/accounts');
          break;
        case 'Currency':
          router.navigate('/currency');
          break;
        case 'Exit':
          token = '';
          localStorage.setItem('token', JSON.stringify(token));
          router.navigate('/');
          break;
        default:
      }
    });
  });
}
