import _ from 'lodash';

export default (tree) => {
  const render = (leaf, depth = 1) => {
    const keys = Object.keys(leaf);
    return keys.reduce((acc, node) => {
      const {
        value, children, status, prevValue,
      } = leaf[node];
      const space = '  '.repeat(depth);
      const stringify = (data) => (_.isObject(data) ? `{\n${render(data, depth + 2)}${space}  }` : data);
      const uniteAll = (data, operator = '  ') => `${space}${operator}${node}: ${_.has(leaf[node], 'children') ? stringify(children)
        : (typeof data === 'boolean' ? data.toString() : stringify(data)) || leaf[node]}\n`;
      const statusMap = {
        default: uniteAll(value),
        changed: `${uniteAll(prevValue, '- ')}${uniteAll(value, '+ ')}`,
        added: uniteAll(value, '+ '),
        deleted: uniteAll(value, '- '),
      };
      return `${acc}${status ? statusMap[status] : statusMap.default}`;
    }, '');
  };
  return `{\n${render(tree)}}`;
};
