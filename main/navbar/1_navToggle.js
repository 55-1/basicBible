export default function navToggleClicked(button) {
  const buttons = document.querySelectorAll('#navbar button');
  buttons.forEach(b => {
    if (b !== button) {
      b.style.display = b.style.display === 'none' ? '' : 'none';
    }
  });
  const icon = button.querySelector('img');
  icon.src = icon.src.includes('chevron-down.svg') ? 'assets/images/navToggle.svg' : 'assets/images/chevron-down.svg';
}
