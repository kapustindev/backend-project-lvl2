import _ from 'lodash';

const space = (num) => '  '.repeat(num);

const stringify = (data, deep) => {
  if (!_.isObject(data)) {
    return data;
  }
  const [objName, objValue] = _.flatten(Object.entries(data));
  return `{\n${space(deep + 3)}${objName}: ${objValue}\n${space(deep + 1)}}`;
};

export default (tree) => {
  const render = (leaf, depth = 1) => {
    const result = leaf.reduce((acc, node) => {
      const {
        key, status, children, value, prevValue,
      } = node;

      switch (status) {
        case 'added':
          return `${acc}${space(depth)}+ ${key}: ${stringify(value, depth)}\n`;
        case 'deleted':
          return `${acc}${space(depth)}- ${key}: ${stringify(value, depth)}\n`;
        case 'changed':
          return `${acc}${space(depth)}- ${key}: ${stringify(prevValue, depth)}\n${space(depth)}+ ${key}: ${stringify(value, depth)}\n`;
        case 'unchanged':
          return `${acc}${space(depth + 1)}${key}: ${stringify(value, depth)}\n`;
        case 'nested':
          return `${acc}${space(depth + 1)}${key}: {\n${render(children, depth + 2)}${space(depth + 1)}}\n`;
        default:
          throw new Error(`Error! '${status}' is invalid`);
      }
    }, '');
    return result;
  };
  return `{\n${render(tree)}}`;
};
