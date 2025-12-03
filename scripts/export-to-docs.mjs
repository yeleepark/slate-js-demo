import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('../', import.meta.url));
const outDir = join(rootDir, 'out');
const docsDir = join(rootDir, 'docs');

if (!existsSync(outDir)) {
  console.error('❌  "out" 디렉터리가 없습니다. 먼저 `yarn build`를 실행하세요.');
  process.exit(1);
}

rmSync(docsDir, { recursive: true, force: true });
mkdirSync(docsDir, { recursive: true });

cpSync(outDir, docsDir, { recursive: true });
writeFileSync(join(docsDir, '.nojekyll'), '');

console.log('✅  "out" 디렉터리를 "docs"로 동기화했습니다.');
