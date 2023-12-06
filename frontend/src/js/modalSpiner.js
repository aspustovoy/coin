export default function modalSpiner() {
  document.body.classList.toggle('stop-scroll');
  document
    .querySelector('.modal-overlay')
    .classList.toggle('modal-overlay--visible');
  document.querySelector('.modal1').classList.toggle('modal1--visible');
}
