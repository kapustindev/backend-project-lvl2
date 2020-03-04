import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);
const getContent = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

test.each([
  ['before.json', 'after.json', 'result.txt'],
  ['before.yml', 'after.yml', 'result.txt'],
  ['before.ini', 'after.ini', 'result.txt'],
])('%s', (a, b, expected) => {
  const path1 = getPath(a);
  const path2 = getPath(b);
  const result = getContent(expected);
  expect(genDiff(path1, path2)).toMatch(result);
});

test('plain format', () => {
  const path1 = getPath('before.json');
  const path2 = getPath('after.json');
  const final = getContent('plain-diff.txt');
  expect(genDiff(path1, path2, 'plain')).toMatch(final);
});
