import { getDataFromXml } from '../../components/getData.js';

function createVerseElement(index, verse) {
  const verseContainer = document.createElement('p');
  verseContainer.className = 'verseContainer';

  const verseNumber = document.createElement('span');
  verseNumber.className = 'verseNumber';
  verseNumber.style.display = 'block';
  verseNumber.textContent = `${index}`;
  
  const verseText = document.createElement('span');
  verseText.className = 'verseText';
  verseText.textContent = verse.textContent;
  
  verseContainer.appendChild(verseNumber);
  verseContainer.appendChild(verseText);
  
  

  return verseContainer;
}

export async function displayVerses(bookNumber, chapterNumber) {
  const xmlDoc = await getDataFromXml();
  
  const bookElement = xmlDoc.querySelector(`book[number="${bookNumber}"]`);
  const chapterElement = bookElement.querySelector(`chapter[number="${chapterNumber}"]`);
  const verses = chapterElement.querySelectorAll('verse');
  
  const versesElement = document.getElementById('verses');
  versesElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  
  verses.forEach((verse, index) => {
    const verseElement = createVerseElement(index + 1, verse);
    fragment.appendChild(verseElement);
  });
  versesElement.appendChild(fragment);
  
  versesElement.scrollTop = 0;
  
  const showVerseNumbersCheckbox = document.getElementById('showVerseNumbers');
  const verseNumbers = document.querySelectorAll('.verseNumber');
  verseNumbers.forEach(verseNumber => verseNumber.style.display = showVerseNumbersCheckbox.checked ? '' : 'none');
}

