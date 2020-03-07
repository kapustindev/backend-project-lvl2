import _ from 'lodash';

const stringifyValue = (data) => (_.isObject(data) ? '[complex value]' : data);

const render = (tree, path = '') => {
  const newArr = [...tree];
  return newArr.reduce((acc, w) => {
    const {
      name, status, value, prevValue,
    } = w;
    const getBegin = () => `Property '${path}${name}' was ${status}`;
    const statusMap = {
      added: `${getBegin()} with value: ${stringifyValue(value)}`,
      deleted: `${getBegin()}`,
      changed: `${getBegin()} from ${stringifyValue(prevValue)} to ${stringifyValue(value)}`,
    };
    if (status !== 'nested') {
      return status === 'default' ? acc : [...acc, statusMap[status]];
    }
    return [...acc, ...render(value, `${path}${name}.`)];
  }, []);
};

export default (ast) => render(ast).join('\n');
