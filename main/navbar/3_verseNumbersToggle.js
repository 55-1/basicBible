export default function verseNumbersToggleClicked() {
  const verseNumbers = document.querySelectorAll('.verse-number');
  verseNumbers.forEach(verseNumber => verseNumber.style.display = verseNumber.style.display === 'none' ? '' : 'none');
  }
  