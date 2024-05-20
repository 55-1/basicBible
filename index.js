import { bookNames, renderVerses, fetchXmlData, handleBookButtonClick, renderChapters } from './utils.js';

window.onload = async () => {
  const hash = window.location.hash;
  if (hash) {
    const [bookNumber, chapterNumber] = hash.slice(2).split('/').map(Number);
    if (bookNumber && chapterNumber) {
      const xmlDoc = await fetchXmlData();
      const books = xmlDoc.getElementsByTagName("book");
      let book;
      for (let i = 0; i < books.length; i++) {
        if (Number(books[i].getAttribute('number')) === bookNumber) {
          book = books[i];
          break;
        }
      }
      const chapters = book.getElementsByTagName("chapter");
      renderChapters(chapters, bookNumber - 1, chaptersDiv, ervDiv);
      const chapter = chapters[chapterNumber - 1];
      const verses = chapter.getElementsByTagName("verse");
      renderVerses(verses, ervDiv);

      // Check the appropriate book and chapter radio buttons
      document.querySelector(`#book${bookNumber - 1}`).checked = true;
      document.querySelector(`#chapter${chapterNumber - 1}`).checked = true;
    }
  }
};

const booksDiv = document.querySelector('#books');
const chaptersDiv = document.querySelector('#chapters');
const ervDiv = document.querySelector('#erv');

const handleVerseButtonClick = async () => {
  const xmlDoc = await fetchXmlData();
  const book = xmlDoc.getElementsByTagName("book")[0];
  const chapter = book.getElementsByTagName("chapter")[0];
  const verses = chapter.getElementsByTagName("verse");
  renderVerses(verses, ervDiv);
};

for (let i = 0; i < bookNames.length; i++) {
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'book';
  radio.id = `book${i}`;
  radio.value = bookNames[i];
  radio.addEventListener('change', () => handleBookButtonClick(i, chaptersDiv, ervDiv));
  booksDiv.appendChild(radio);

  const label = document.createElement('label');
  label.htmlFor = `book${i}`;
  label.textContent = bookNames[i];
  booksDiv.appendChild(label);
}