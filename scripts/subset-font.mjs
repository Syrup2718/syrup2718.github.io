import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(projectRoot, 'src');
const sourceFont = path.join(sourceRoot, 'assets', 'fonts', 'setofont-source.woff2');
const outputFont = path.join(
  projectRoot,
  'public',
  'fonts',
  'setofont',
  'setofont-subset.woff2',
);

const textExtensions = new Set([
  '.astro',
  '.css',
  '.js',
  '.json',
  '.md',
  '.mdx',
  '.svg',
  '.ts',
]);

// 動態產生的數字、拉丁字母與常用標點不一定會完整出現在原始碼裡。
const requiredCharacters = [
  ...Array.from({ length: 95 }, (_, index) => String.fromCharCode(32 + index)),
  '　，。！？；：「」『』（）【】《》〈〉、—…・～★☆✦◇←→©×',
].join('');

async function collectTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectTextFiles(entryPath));
    } else if (entry.isFile() && textExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(entryPath);
    }
  }

  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

const files = await collectTextFiles(sourceRoot);
const sourceText = await Promise.all(files.map((file) => readFile(file, 'utf8')));
const glyphs = [...new Set(`${requiredCharacters}${sourceText.join('')}`)].join('');
const original = await readFile(sourceFont);
const subset = await subsetFont(original, glyphs, {
  targetFormat: 'woff2',
  preserveNameIds: [0, 1, 2, 3, 4, 5, 6, 13, 14],
});

if (subset.subarray(0, 4).toString('ascii') !== 'wOF2') {
  throw new Error('產生的檔案不是有效的 WOFF2 字型。');
}

await mkdir(path.dirname(outputFont), { recursive: true });
await writeFile(outputFont, subset);

const reduction = ((1 - subset.length / original.length) * 100).toFixed(1);
console.log(
  `[font:subset] ${files.length} files, ${[...glyphs].length} characters: ` +
  `${formatBytes(original.length)} → ${formatBytes(subset.length)} (${reduction}% smaller)`,
);
