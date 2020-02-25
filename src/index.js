import _ from 'lodash';
import fs from 'fs';
import parse from './utils/parsers.js';

const getContent = (path) => fs.readFileSync(path, 'utf-8');

export default (path1, path2) => {
  const parseFunc = parse(path1);
  const files = [path1, path2].map((w) => getContent(w));
  const flatObjects = files.map((w) => parseFunc(w));
  const string = _.flatten(flatObjects.map((w) => Object.keys(w)))
    .filter((w, index, arr) => arr.indexOf(w) === index)
    .reduce((acc, w) => {
      const [first, second] = [flatObjects[0], flatObjects[1]];
      if ((_.has(first, w)) && (_.has(second, w))) {
        return `${acc}${first[w] === second[w] ? `    ${w}: ${first[w]}\n` : `  + ${w}: ${second[w]}\n  - ${w}: ${first[w]}\n`}`;
      }
      return `${acc}${_.has(first, w) ? `  - ${w}: ${first[w]}\n` : `  + ${w}: ${second[w]}\n`}`;
    }, '');
  return `{\n${string}}`;
};
