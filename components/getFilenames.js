export async function getFilenames(folder) {
    console.log(`Fetching filenames from ${folder}`);
    const response = await fetch(folder);
    console.log(`Response status: ${response.status}`);
    const data = await response.text();
    console.log(`Response data: ${data}`);
    const filenames = data.match(/title="([^"]+)"/g);
    console.log(`Filenames found: ${filenames}`);
    const filteredFilenames = filenames.map(f => f.replace(/title="|"/g, '')).filter(filename => filename !== '..').map(filename => filename.replace('.js', '').replace(/^_/, ''));
    console.log(`Filtered filenames: ${filteredFilenames}`);
    return filteredFilenames;


}
