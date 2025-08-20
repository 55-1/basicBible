import { createNavbar } from './components/navbar.js';
import { displayBookNames } from './main/bible/books.js';
import { parseUrlHash, navigateToVerse } from './components/urlVerseNavigation.js';


createNavbar('../main/navbar/').then(() => {
  displayBookNames().then(() => {
    const hashParams = parseUrlHash();
    if (hashParams) {navigateToVerse(hashParams);}

  });
});