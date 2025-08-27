import { displayBookNames } from './main/bible/books.js';
import { parseUrlHash, navigateToVerse } from './components/urlVerseNavigation.js';

  displayBookNames().then(() => {
    const hashParams = parseUrlHash();
    if (hashParams) {navigateToVerse(hashParams);}

  });
