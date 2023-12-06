export default function dragAndDrop() {
  document.querySelectorAll('.drop').forEach((el) => {
    el.draggable = true;
    el.ondragstart = (e) => {
      e.dataTransfer.setData('id', e.target.id);
      e.target.classList.add('dragging');
    };
    el.ondragover = (e) => {
      e.preventDefault();
      const fromEl = document.querySelector('.dragging');
      const old = document.querySelector('.over');
      if (old) old.classList.remove('over');
      if (fromEl.parentNode === e.target.parentNode) {
        e.target.classList.add('over');
      }
    };
    el.ondrop = (e) => {
      const fromEl = document.querySelector(`#${e.dataTransfer.getData('id')}`);
      if (fromEl.parentNode === e.target.parentNode) {
        e.target.after(fromEl);
      }
      let old = document.querySelector('.dragging');
      if (old) old.classList.remove('dragging');
      old = document.querySelector('.over');
      if (old) old.classList.remove('over');
    };
    el.ondragend = () => {
      let old = document.querySelector('.dragging');
      if (old) old.classList.remove('dragging');
      old = document.querySelector('.over');
      if (old) old.classList.remove('over');
    };
  });
}
