import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './utils/parsers.js';
import formatter from './formatters/index.js';

const getContent = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getExtension = (filepath) => path.extname(filepath).slice(1);

const makeAst = (a, b) => {
  const uniqKeys = _.union(Object.keys(a), Object.keys(b));
  return uniqKeys.map((key) => {
    const oldValue = a[key];
    const newValue = b[key];

    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return { key, status: 'nested', children: makeAst(oldValue, newValue) };
    }
    if (_.has(a, key) && !_.has(b, key)) {
      return { key, status: 'deleted', value: oldValue };
    }
    if (_.has(b, key) && !_.has(a, key)) {
      return { key, status: 'added', value: newValue };
    }
    if (oldValue === newValue) {
      return { key, status: 'unchanged', value: oldValue };
    }
    return {
      key, status: 'changed', value: newValue, prevValue: oldValue,
    };
  });
};

export default (path1, path2, formatType = 'tree') => {
  const format = formatter(formatType);
  const dataType = getExtension(path1);

  const content1 = getContent(path1);
  const content2 = getContent(path2);

  const parsedData1 = parse(content1, dataType);
  const parsedData2 = parse(content2, dataType);

  const tree = makeAst(parsedData1, parsedData2);
  return format(tree);
};
