export function createRadioButton(type, value, text, callback) {
  const label = document.createElement('label');
  const radio = document.createElement('input');

  radio.type = 'radio';
  radio.name = type;
  radio.value = value.toString();
  radio.addEventListener('change', callback);

  label.appendChild(radio);
  label.appendChild(document.createTextNode(text));

  return label;
}