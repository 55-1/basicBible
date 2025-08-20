import { getDataFromXml } from '../../components/getData.js';
import { speakText } from '../../modules/speakText.js';
import { getCookie } from '../../components/getCookie.js';


function createVerseElement(index, verse) {
  const verseContainer = document.createElement('p');
  verseContainer.className = 'verse-container';

  const verseNumber = document.createElement('span');
  verseNumber.className = 'verse-number';
  verseNumber.style.display = 'block';
  verseNumber.textContent = `${index}`;
  
  const verseText = document.createElement('span');
  verseText.className = 'verse-text';
  verseText.textContent = verse.textContent;
  
  verseContainer.appendChild(verseNumber);
  verseContainer.appendChild(verseText);
  
  
  const speakTextCookie = getCookie('speakText');
  if (speakTextCookie == 'true') {
    verseContainer.addEventListener('click', () => {
      if (window.speechSynthesis.speaking) {window.speechSynthesis.cancel();}
      else {
        const currentVerseIndex = Array.prototype.indexOf.call(verseContainer.parentNode.children, verseContainer);
        const verses = document.querySelectorAll('.verse-container');
        speakText(verse.textContent);
        for (let i = currentVerseIndex + 1; i < verses.length; i++) {
          speakText(verses[i].querySelector('.verse-text').textContent);
        }
      }
    });
  }
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
}

