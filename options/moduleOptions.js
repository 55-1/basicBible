// options/moduleOptions.js
import { getFilenames } from '../components/getFilenames.js';
import { getCookie } from '../components/getCookie.js';
import { toggleVoiceOptions } from '../components/voiceOptions.js';
import { speakText } from '../modules/speakText.js';

const demoPhrases = [
  "The aroma of freshly baked bread filled the entire kitchen.",
  "The cat chased the red laser dot around the living room.",
  "Remember to drink plenty of water throughout the day.",
  "I can't believe I forgot my keys again this morning.",
  "The dog wagged its tail excitedly when it saw its owner."
];

export async function moduleOptions() {
  const filenames = await getFilenames('../main/navbar/');
  const moduleFilenames = await getFilenames('../modules/');
  const allFilenames = filenames.concat(moduleFilenames);

  const container = document.getElementById('container');

  const voiceOptions = document.getElementById('voice-options');
  const speakTextCookie = getCookie('speakText');
  if (speakTextCookie === 'true') {voiceOptions.style.display = 'block';}
  const rateCookie = getCookie('rate');
  if (rateCookie) {
    document.getElementById('rate').value = rateCookie;
    document.getElementById('rate-value').textContent = rateCookie;
  }
  const pitchCookie = getCookie('pitch');
  if (pitchCookie) {
    document.getElementById('pitch').value = pitchCookie;
    document.getElementById('pitch-value').textContent = pitchCookie;
  }

  let demoPhraseIndex = 0;
  const voiceSelect = document.getElementById('voice-select');
  voiceSelect.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    const phrase = demoPhrases[demoPhraseIndex++ % demoPhrases.length];
    speakText(phrase);
  });



  allFilenames.forEach((filename) => {
    const cleanFilename = filename.replace(/^\d+_/g, '');
    const h2Container = document.createElement('div');
    h2Container.id = 'h2-container';

    const h2 = document.createElement('h2');
    h2.id = `${cleanFilename}Label`;
    h2.textContent = `Icon - ${cleanFilename}`;

    const label = document.createElement('label');
    label.id = 'switch';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = cleanFilename;

    const cookieValue = getCookie(cleanFilename);
    if (!cookieValue) {
      input.checked = cleanFilename !== 'speakText';
    } else {
      input.checked = cookieValue === 'true';
    }

    input.addEventListener('change', () => {
      if (cleanFilename === 'speakText') {toggleVoiceOptions(input.checked);}
      const isChecked = input.checked;
      const cookieValue = isChecked ? 'true' : 'false';
      document.cookie = `${cleanFilename}=${cookieValue}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    });

    const slider = document.createElement('span');
    slider.classList.add('slider');

    label.appendChild(input);
    label.appendChild(slider);

    h2Container.appendChild(h2);
    h2Container.appendChild(label);

    container.appendChild(h2Container);
  });
}

