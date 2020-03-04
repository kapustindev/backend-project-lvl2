import _ from 'lodash';
import fs from 'fs';
import parse from './utils/parsers.js';
import formatter from './formatters/index.js';

const getContent = (path) => fs.readFileSync(path, 'utf-8');

const makeFlat = (a, b) => {
  const uniqKeys = _.union(Object.keys(a), Object.keys(b));
  return uniqKeys.reduce((acc, node) => {
    const getValue = (value1, value2) => {
      if (_.isObject(value1) && _.isObject(value2)) {
        return {
          children: makeFlat(value1, value2),
          status: 'default',
        };
      }
      if (_.has(a, node) && _.has(b, node)) {
        return value1 === value2 ? {
          value: value1,
          status: 'default',
        } : {
          value: value2,
          prevValue: value1,
          status: 'changed',
        };
      }
      return _.has(a, node) ? {
        value: value1,
        status: 'deleted',
      } : {
        value: value2,
        status: 'added',
      };
    };
    return { ...acc, [node]: getValue(a[node], b[node]) };
  }, {});
};

export default (path1, path2, formatType = 'tree') => {
  const parseFunc = parse(path1);
  const format = formatter(formatType);
  const files = [path1, path2].map((w) => getContent(w));
  const flatObjects = files.map((w) => parseFunc(w));
  const tree = makeFlat(flatObjects[0], flatObjects[1]);
  return format(tree);
};
