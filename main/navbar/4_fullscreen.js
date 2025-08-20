export default function fullscreenButtonClicked() {
  const img = document.querySelector('#fullscreen img');
  if (document.fullscreenElement) {
    document.exitFullscreen();
    img.src = 'assets/images/fullscreen.svg';
  } else {
    const docEl = document.documentElement;
    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    requestFullScreen.call(docEl);
    img.src = 'assets/images/minimize.svg';
  }
}

