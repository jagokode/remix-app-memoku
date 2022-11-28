import fs from 'fs/promises';

export async function getStoredMemos() {
  const rawFileContent = await fs.readFile('memos.json', {
    encoding: 'utf-8',
  });
  const data = JSON.parse(rawFileContent);
  const storedMemos = data.memos ?? [];
  return storedMemos;
}

export function storedMemos(memos) {
  return fs.writeFile('memos.json', JSON.stringify({ memos: memos || [] }));
}
