import { getFilenames } from './getFilenames.js';
import { getCookie } from "./getCookie.js";

export async function createNavbar(folder) {
  const filenames = await getFilenames(folder);
  
  filenames.forEach(filename => {
    const cleanFilename = filename.replace(/^\d+_/g, '');
    const cookieValue = getCookie(cleanFilename);

    if (!cookieValue || cookieValue === 'true') {
      const button = document.createElement('button');
      button.id = cleanFilename;
      const img = document.createElement('img');
      img.src = `../assets/images/${cleanFilename}.svg`;
      button.appendChild(img);
  
      button.onclick = async () => {
        const module = await import(`${folder}${filename}.js`);
        module.default(button);
      };
  
      document.getElementById('navbar').appendChild(button);
    }
  });
}