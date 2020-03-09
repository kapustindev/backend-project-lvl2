import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './utils/parsers.js';
import formatter from './formatters/index.js';

const getContent = (filepath) => fs.readFileSync(filepath, 'utf-8');

const getDiffrence = (a, b) => {
  const uniqKeys = _.union(Object.keys(a), Object.keys(b));
  return uniqKeys.map((name) => {
    const [value1, value2] = [a[name], b[name]];
    if (_.isObject(value1) && _.isObject(value2)) {
      return { name, status: 'nested', value: getDiffrence(value1, value2) };
    }
    if (_.has(a, name) && _.has(b, name)) {
      return value1 === value2 ? { name, status: 'default', value: value1 } : {
        name, status: 'changed', value: value2, prevValue: value1,
      };
    }
    return _.has(a, name) ? { name, status: 'deleted', value: value1 } : { name, status: 'added', value: value2 };
  });
};

export default (path1, path2, formatType = 'tree') => {
  const format = formatter(formatType);
  const ending = path.extname(path1);
  const parseFunc = parse[ending];

  const content1 = getContent(path1);
  const content2 = getContent(path2);

  const parsedData1 = parseFunc(content1);
  const parsedData2 = parseFunc(content2);

  const tree = getDiffrence(parsedData1, parsedData2);
  return format(tree);
};
