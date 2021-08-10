import fs from 'fs';

export function base64Encoder(file: any) {
  return fs.readFileSync(file, 'base64');
}
