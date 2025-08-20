import { getCookie } from '../components/getCookie.js';

export function speakText(text) {
  text = text.replace(/[^a-zA-Z0-9\s\.,!]/g, '');

  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;

  const rate = getCookie('rate') || 1;
  utterance.rate = rate;

  const pitch = getCookie('pitch') || 1;
  utterance.pitch = pitch;

  const voiceName = getCookie('voice') || 'default';
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((voice) => voice.name === voiceName);
  utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}
