export default function sidebarToggleClicked() {
    const booksElement = document.getElementById('books');
    const chaptersElement = document.getElementById('chapters');
    const display = booksElement.style.display === 'none' ? '' : 'none';
    booksElement.style.display = display;
    chaptersElement.style.display = display;
  }
