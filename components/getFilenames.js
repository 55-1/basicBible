export async function getFilenames(folder) {
    const response = await fetch(folder);
    const data = await response.text();
    const filenames = data.match(/title="([^"]+)"/g).map(f => f.replace(/title="|"/g, ''));
    const filteredFilenames = filenames.filter(filename => filename !== '..').map(filename => filename.replace('.js', '').replace(/^_/, ''));
    return filteredFilenames;
}