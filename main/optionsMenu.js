    document.getElementById('menuButton').addEventListener('click', () => {
          const optionsImage = document.getElementById('options');
          optionsImage.src = optionsImage.src.includes('x.svg') ? './assets/images/options.svg' : './assets/images/x.svg';
        });
    document.getElementById('showVerseNumbers').addEventListener('change', () => {
      const verseNumbers = document.querySelectorAll('.verseNumber');
      verseNumbers.forEach(verseNumber => verseNumber.style.display = document.getElementById('showVerseNumbers').checked ? '' : 'none');
    });
    document.getElementById('showSidebar').addEventListener('change', () => {
      const sidebar = document.getElementById('sidebar');
      sidebar.style.display = document.getElementById('showSidebar').checked ? 'flex' : 'none';
    });