const fs = require('fs');
const axios = require('axios');

async function ingestFile(path, text) {
  await axios.post('http://localhost:8000/ingest', { path, text });
}

(async () => {
  const folders = ['patterns', 'problems', 'templates', 'mistakes'];

  for (const folder of folders) {
    const files = fs.readdirSync(`../data/${folder}/`);
    for (const file of files) {
      const text = fs.readFileSync(`../data/${folder}/${file}`, 'utf8');
      await ingestFile(`${folder}/${file}`, text);
      console.log(`Ingested ${folder}/${file}`);
    }
  }
})();
