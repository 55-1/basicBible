export default function nextChapterClicked() {
    const currentChapter = parseInt(document.querySelector('input[name="chapter"]:checked').value);
    const currentBook = parseInt(document.querySelector('input[name="book"]:checked').value);
    const nextChapter = currentChapter + 1;
    const allChapters = document.querySelectorAll('input[name="chapter"]');
    const nextChapterExists = Array.from(allChapters).some(chapter => parseInt(chapter.value) === nextChapter);
    if (nextChapterExists) {
      const nextChapterButton = document.querySelector(`label:has(> input[name="chapter"][value="${nextChapter}"])`);
      nextChapterButton.click();
    }
  }
