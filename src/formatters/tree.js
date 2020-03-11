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
    const newArr = [...leaf];
    return newArr.reduce((acc, node) => {
      const {
        key, status, children, value, prevValue,
      } = node;

      const statusMap = {
        notChanged: `${space(depth + 1)}${key}: ${stringify(value, depth)}`,
        changed: `${space(depth)}- ${key}: ${stringify(prevValue, depth)}\n${space(depth)}+ ${key}: ${stringify(value, depth)}`,
        added: `${space(depth)}+ ${key}: ${stringify(value, depth)}`,
        deleted: `${space(depth)}- ${key}: ${stringify(value, depth)}`,
      };

      if (!children) {
        return `${acc}${statusMap[status]}\n`;
      }
      return `${acc}${space(depth + 1)}${key}: {\n${render(children, depth + 2)}${space(depth + 1)}}\n`;
    }, '');
  };
  return `{\n${render(tree)}}`;
};
