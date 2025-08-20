let cachedXmlDoc;

export async function getDataFromXml() {
  if (cachedXmlDoc) return cachedXmlDoc;
  const response = await fetch('data/erv.xml');
  const xmlDoc = await response.text();
  const parser = new DOMParser();
  return cachedXmlDoc = parser.parseFromString(xmlDoc, "text/xml");
}