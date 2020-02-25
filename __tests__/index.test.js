import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);
const getContent = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

test('result json', () => {
  const path1 = getPath('before.json');
  const path2 = getPath('after.json');
  const final = getContent('result.txt');
  expect(genDiff(path1, path2)).toMatch(final);
});

test('result yaml', () => {
  const path1 = getPath('before.yml');
  const path2 = getPath('after.yml');
  const final = getContent('result.txt');
  expect(genDiff(path1, path2)).toMatch(final);
});

test('result ini', () => {
  const path1 = getPath('before.ini');
  const path2 = getPath('after.ini');
  const final = getContent('result.txt');
  expect(genDiff(path1, path2)).toMatch(final);
});
