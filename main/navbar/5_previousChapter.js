export default function previousChapterClicked() {
    const currentChapter = parseInt(document.querySelector('input[name="chapter"]:checked').value);
    const currentBook = parseInt(document.querySelector('input[name="book"]:checked').value);
    const previousChapter = currentChapter - 1;
    if (previousChapter > 0) {
      const previousChapterButton = document.querySelector(`label:has(> input[name="chapter"][value="${previousChapter}"])`);
      previousChapterButton.click();
    }
  }