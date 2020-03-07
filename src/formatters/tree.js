import _ from 'lodash';

const space = (num) => '  '.repeat(num);

export default (tree) => {
  const render = (leaf, depth = 1) => {
    const newArr = [...leaf];
    return newArr.reduce((acc, w) => {
      const {
        name, status, value, prevValue,
      } = w;
      const stringify = (data) => {
        if (!_.isObject(data)) {
          return data;
        }
        const [objName, objValue] = _.flatten(Object.entries(data));
        return `{\n${space(depth + 2)}${objName}: ${objValue}${space(depth)} \n${space(depth + 1)}}`;
      };
      const uniteAll = (data, operator = '  ') => `${space(depth)}${operator}${name}: ${_.isArray(data) ? `{\n${render(data, depth + 2)}${space(depth)}  }` : stringify(data)}\n`;
      const statusMap = {
        default: uniteAll(value),
        nested: uniteAll(value),
        changed: `${uniteAll(prevValue, '- ')}${uniteAll(value, '+ ')}`,
        added: uniteAll(value, '+ '),
        deleted: uniteAll(value, '- '),
      };
      return `${acc}${statusMap[status]}`;
    }, '');
  };
  return `{\n${render(tree)}}`;
};
