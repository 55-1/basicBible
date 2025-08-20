const rateSlider = document.getElementById('rate');
const pitchSlider = document.getElementById('pitch');
const voiceSelect = document.getElementById('voice-select');


export function voiceOptions() {
  const voices = window.speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = voice.name;
    voiceSelect.appendChild(option);
  });

  rateSlider.addEventListener('input', () => {
    const rateValue = rateSlider.value;
    document.getElementById('rate-value').textContent = rateValue;
    document.cookie = `rate=${rateValue}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  });
  pitchSlider.addEventListener('input', () => {
    const pitchValue = pitchSlider.value;
    document.getElementById('pitch-value').textContent = pitchValue;
    document.cookie = `pitch=${pitchValue}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  });

  voiceSelect.addEventListener('change', () => {
    const voiceValue = voiceSelect.value;
    document.cookie = `voice=${voiceValue}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  });
}

export function toggleVoiceOptions(isChecked) {
  const voiceOptions = document.getElementById('voice-options');
  if (isChecked) {voiceOptions.style.display = 'block';}
  else {voiceOptions.style.display = 'none';}
}

