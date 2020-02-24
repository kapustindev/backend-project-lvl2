import fs from 'fs';
import path from 'path';
import genDiff from '..';

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);
const getContent = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

test('result', () => {
  const path1 = getPath('before.json');
  const path2 = getPath('after.json');
  const final = getContent('result.txt');
  expect(genDiff(path1, path2)).toMatch(final);
});
