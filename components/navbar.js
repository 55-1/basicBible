import { getFilenames } from './getFilenames.js';
import { getCookie } from "./getCookie.js";

export async function createNavbar(folder) {
  console.log(`Fetching filenames from ${folder}`);
  const filenames = await getFilenames(folder);
  console.log(`Filenames found: ${filenames}`);

  filenames.forEach(filename => {
    console.log(`Processing filename: ${filename}`);
    const cleanFilename = filename.replace(/^\d+_/g, '');
    console.log(`Clean filename: ${cleanFilename}`);
    const cookieValue = getCookie(cleanFilename);
    console.log(`Cookie value for ${cleanFilename}: ${cookieValue}`);

    if (!cookieValue || cookieValue === 'true') {
      console.log(`Cookie value is truthy, creating button for ${cleanFilename}`);
      const button = document.createElement('button');
      button.id = cleanFilename;
      const img = document.createElement('img');
      console.log(`Creating image element with src: ../assets/images/${cleanFilename}.svg`);
      img.src = `../assets/images/${cleanFilename}.svg`;
      button.appendChild(img);
  
      button.onclick = async () => {
        console.log(`Button ${cleanFilename} clicked`);
        const module = await import(`${folder}${filename}.js`);
        console.log(`Imported module for ${filename}`);
        module.default(button);
      };
  
      console.log(`Appending button ${cleanFilename} to navbar`);
      document.getElementById('navbar').appendChild(button);
    } else {
      console.log(`Cookie value is falsy, skipping button creation for ${cleanFilename}`);
    }
  });
}
