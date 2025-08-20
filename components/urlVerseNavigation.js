export function parseUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const params = hash.split('-');
      const bookNumber = parseInt(params[0]);
      let chapterNumber = 1;
      let verseNumber = 1;
      if (params.length > 1) {chapterNumber = parseInt(params[1]);}
      if (params.length > 2) {verseNumber = parseInt(params[2]);}
      return { bookNumber, chapterNumber, verseNumber };
    }
    return null;
  }
  
export async function navigateToVerse({ bookNumber, chapterNumber, verseNumber }) {
    const bookButton = document.querySelector(`label:has(> input[name="book"][value="${bookNumber.toString()}"])`);
    if (bookButton) {
      bookButton.click();
      await new Promise(resolve => setTimeout(resolve, 100));
      const chapterButton = document.querySelector(`label:has(> input[name="chapter"][value="${chapterNumber.toString()}"])`);
      if (chapterButton) {
        chapterButton.click();
        await new Promise(resolve => setTimeout(resolve, 100));
        const verseElement = document.querySelector(`.verse-container:nth-child(${verseNumber})`);
        if (verseElement) {
          verseElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
}
  
