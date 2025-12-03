import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const outDir = join(rootDir, 'out');
const docsDir = join(rootDir, 'docs');

if (!existsSync(outDir)) {
  console.error('❌  "out" directory not found. Run `yarn build` first.');
  process.exit(1);
}

rmSync(docsDir, { recursive: true, force: true });
mkdirSync(docsDir, { recursive: true });
cpSync(outDir, docsDir, { recursive: true });
writeFileSync(join(docsDir, '.nojekyll'), '');

console.log('✅  Synced static export from "out" to "docs".');
