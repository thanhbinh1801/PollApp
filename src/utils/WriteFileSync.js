import fs from 'fs';
import path from 'path';

async function writeFileSync(dbjson) {
  await fs.writeFileSync(path.resolve('src/db/db.json'), JSON.stringify(dbjson, null, 2));
}

export default writeFileSync;
