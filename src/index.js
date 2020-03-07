import _ from 'lodash';
import fs from 'fs';
import parse from './utils/parsers.js';
import formatter from './formatters/index.js';

const getContent = (path) => fs.readFileSync(path, 'utf-8');

const makeFlat = (a, b) => {
  const uniqKeys = _.union(Object.keys(a), Object.keys(b));
  return uniqKeys.map((name) => {
    const [value1, value2] = [a[name], b[name]];
    if (_.isObject(value1) && _.isObject(value2)) {
      return { name, status: 'nested', value: makeFlat(value1, value2) };
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
  const parseFunc = parse(path1);
  const format = formatter(formatType);
  const files = [path1, path2].map((w) => getContent(w));
  const flatObjects = files.map((w) => parseFunc(w));
  const tree = makeFlat(flatObjects[0], flatObjects[1]);
  return format(tree);
};
