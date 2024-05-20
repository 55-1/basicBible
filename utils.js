export const bookNames = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'];

export const renderVerses = (verses, ervDiv) => {
  ervDiv.innerHTML = '';
  for (let i = 0; i < verses.length; i++) {
    const verseNumber = verses[i].getAttribute('number');
    const verseText = verses[i].childNodes[0].nodeValue;
    ervDiv.innerHTML += `<div class="number">${verseNumber}</div><div class="text">${verseText}</div>`;
  }
};

export const fetchXmlData = async () => {
  try {
    const response = await fetch('erv.xml');
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    return xmlDoc;
  } catch (err) {
    console.error('Error:', err);
  }
};

export const handleBookButtonClick = async (i, chaptersDiv, ervDiv) => {
  console.log(`Clicked on ${bookNames[i]} button`);
  const xmlDoc = await fetchXmlData();
  const books = xmlDoc.getElementsByTagName("book");
  let clickedBook;
  for (let j = 0; j < books.length; j++) {
    if (Number(books[j].getAttribute('number')) === i + 1) {
      clickedBook = books[j];
      break;
    }
  }
  const chapters = clickedBook.getElementsByTagName("chapter");
  renderChapters(chapters, i, chaptersDiv, ervDiv);
  window.location.hash = `/${i+1}`; // Add this line
};



export const handleChapterButtonClick = async (bookNumber, chapterNumber, ervDiv) => {
  console.log(`Clicked on Chapter ${chapterNumber + 1} of Book ${bookNumber + 1}`);
  const xmlDoc = await fetchXmlData();
  const books = xmlDoc.getElementsByTagName("book");
  let book;
  for (let i = 0; i < books.length; i++) {
    if (Number(books[i].getAttribute('number')) === bookNumber + 1) {
      book = books[i];
      break;
    }
  }
  console.log(`Selected Book: ${book.getAttribute('name')}`);
  const chapter = book.getElementsByTagName("chapter")[chapterNumber];
  console.log(`Selected Chapter: ${chapter.getAttribute('number')}`);
  const verses = chapter.getElementsByTagName("verse");
  console.log(`Total Verses: ${verses.length}`);
  renderVerses(verses, ervDiv);
  window.location.hash = `/${bookNumber+1}/${chapterNumber+1}`;
};

export const renderChapters = (chapters, bookNumber, chaptersDiv, ervDiv) => {
  chaptersDiv.innerHTML = '';
  for (let k = 0; k < chapters.length; k++) {
    const chapterRadio = document.createElement('input');
    chapterRadio.type = 'radio';
    chapterRadio.name = 'chapter';
    chapterRadio.id = `chapter${k}`;
    chapterRadio.value = `${k + 1}`;
    chapterRadio.addEventListener('change', () => handleChapterButtonClick(bookNumber, k, ervDiv));
    chaptersDiv.appendChild(chapterRadio);

    const label = document.createElement('label');
    label.htmlFor = `chapter${k}`;
    label.textContent = `${k + 1}`;
    chaptersDiv.appendChild(label);
 
  }
};