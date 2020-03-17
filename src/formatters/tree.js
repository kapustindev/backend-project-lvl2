import _ from 'lodash';

const space = (num) => '  '.repeat(num);

const stringify = (data, deep) => {
  if (!_.isObject(data)) {
    return data;
  }
  const [objName, objValue] = _.flatten(Object.entries(data));
  return `{\n${space(deep + 3)}${objName}: ${objValue}\n${space(deep + 1)}}`;
};

const statusMap = ({
  key, status, value, prevValue, children,
}, depth, func) => {
  const result = {
    added: () => `${space(depth)}+ ${key}: ${stringify(value, depth)}`,
    deleted: () => `${space(depth)}- ${key}: ${stringify(value, depth)}`,
    changed: () => [`${space(depth)}- ${key}: ${stringify(prevValue, depth)}`, `${space(depth)}+ ${key}: ${stringify(value, depth)}`],
    unchanged: () => `${space(depth + 1)}${key}: ${stringify(value, depth)}`,
    nested: () => `${space(depth + 1)}${key}: {\n${func(children, depth + 2)}\n${space(depth + 1)}}`,
  };
  return result[status]();
};

export default (tree) => {
  const render = (subtree, depth = 1) => {
    const result = subtree.map((node) => statusMap(node, depth, render));
    return _.flattenDeep(result).join('\n');
  };
  return `{\n${render(tree)}\n}`;
};
