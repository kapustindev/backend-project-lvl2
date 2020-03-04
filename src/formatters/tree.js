import _ from 'lodash';

const gap = '  ';

export default (tree) => {
  const render = (leaf, depth = 1) => {
    const keys = Object.keys(leaf);
    return keys.reduce((acc, node) => {
      const {
        value, children, status, prevValue,
      } = leaf[node];
      const space = gap.repeat(depth);
      const stringify = (data) => (_.isObject(data) ? `{\n${render(data, depth + 2)}${space}${gap}}` : data);
      const unite = (data, operator = gap) => `${space}${operator}${node}: ${_.has(leaf[node], 'children') ? stringify(children)
        : (typeof data === 'boolean' ? data.toString() : stringify(data)) || leaf[node]}\n`;
      const statusMap = {
        default: unite(value),
        changed: `${unite(prevValue, '- ')}${unite(value, '+ ')}`,
        added: unite(value, '+ '),
        deleted: unite(value, '- '),
      };
      return `${acc}${status ? statusMap[status] : statusMap.default}`;
    }, '');
  };
  return `{\n${render(tree)}}`;
};
