import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getPath = (filename) => path.join('.', '__fixtures__', filename);
const getContent = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

test.each([
  ['JSON-tree', 'before.json', 'after.json', 'result.txt'],
  ['YML-tree', 'before.yml', 'after.yml', 'result.txt'],
  ['INI-tree', 'before.ini', 'after.ini', 'result.txt'],
  ['Plain format', 'before.json', 'after.json', 'plain-diff.txt', 'plain'],
  ['JSON format', 'before.yml', 'after.yml', 'json-diff.json', 'json'],
])('%s', (name, a, b, expected, formatter = 'tree') => {
  const path1 = getPath(a);
  const path2 = getPath(b);
  const result = getContent(expected);
  expect(genDiff(path1, path2, formatter)).toEqual(result);
});
