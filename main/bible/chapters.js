import { getDataFromXml } from '../../components/getData.js';
import { displayVerses } from './verses.js';
import { createRadioButton } from '../../components/radioButtons.js';


async function getChapterNumbers(bookNumber) {
  const xmlDoc = await getDataFromXml();
  const bookElements = xmlDoc.querySelectorAll(`book[number="${bookNumber}"]`);
  const chapterElements = bookElements[0].querySelectorAll('chapter');
  const chapterNumbers = Array.from(chapterElements).map(chapter => chapter.getAttribute('number'));
  return chapterNumbers;
}
export async function displayChapterNumbers(bookNumber) {
  const chapterNumbers = await getChapterNumbers(bookNumber);
  const chaptersElement = document.getElementById('chapters');
  chaptersElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  chapterNumbers.forEach((chapter, index) => {
    const radioButton = createRadioButton('chapter', chapter, chapter, () => displayVerses(bookNumber, chapter));
    fragment.appendChild(radioButton);
  });
  chaptersElement.appendChild(fragment);
}