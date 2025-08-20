import { getDataFromXml } from '../../components/getData.js';
import { bibleBookNames } from '../../components/bibleBookNames.js';
import { createRadioButton } from '../../components/radioButtons.js';
import { displayChapterNumbers } from './chapters.js';

export async function displayBookNames(bookNumber) {
  const xmlDoc = await getDataFromXml();
  const bookElements = xmlDoc.querySelectorAll('book');

  const fragment = document.createDocumentFragment();
  bookElements.forEach((bookElement, index) => {
    const bookNumber = bookElement.getAttribute('number');
    const bookName = bibleBookNames[bookNumber - 1];
    const radioButton = createRadioButton('book', bookNumber, bookName, () => {
      handleBookClick(bookNumber);
    });
    fragment.appendChild(radioButton);
  });

  document.getElementById('books').appendChild(fragment);
}

async function handleBookClick(bookNumber) {
  await displayChapterNumbers(bookNumber);
  const firstChapterButton = document.querySelector('input[name="chapter"]:first-child');
  if (firstChapterButton) {firstChapterButton.click();}
}