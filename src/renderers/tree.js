import _ from 'lodash';

export default (tree) => {
  const render = (leaf, depth = 1) => {
    const keys = Object.keys(leaf);
    return keys.reduce((acc, node) => {
      const { value, status, prevValue } = leaf[node];
      const space = '  '.repeat(depth);
      const uniteAll = (data, operator = '  ') => `${space}${operator}${node}: ${_.isObject(data) ? `{\n${render(data, depth + 2)}${space}  }`
        : (typeof data === 'boolean' ? data.toString() : data) || leaf[node]}\n`;
      const statusMap = {
        default: uniteAll(value),
        changed: `${uniteAll(prevValue, '- ')}${uniteAll(value, '+ ')}`,
        added: uniteAll(value, '+ '),
        removed: uniteAll(value, '- '),
      };
      return `${acc}${status ? statusMap[status] : statusMap.default}`;
    }, '');
  };
  return `{\n${render(tree)}}`;
};
