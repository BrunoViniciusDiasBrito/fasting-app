import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { config } from 'dotenv';

const candidateEnvFiles = [
  resolve(process.cwd(), '.env'),
  resolve(process.cwd(), '../../.env'),
  resolve(process.cwd(), '../.env'),
  resolve(__dirname, '../../../.env'),
  resolve(__dirname, '../../../../.env'),
];

const loaded = new Set<string>();

for (const envFile of candidateEnvFiles) {
  if (loaded.has(envFile) || !existsSync(envFile)) continue;
  config({ path: envFile });
  loaded.add(envFile);
}
