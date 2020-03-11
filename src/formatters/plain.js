import _ from 'lodash';

const stringifyValue = (data) => (_.isObject(data) ? '[complex value]' : data);

const render = (tree, path = '') => {
  const newArr = [...tree];
  return newArr.reduce((acc, node) => {
    const {
      key, status, children, value, prevValue,
    } = node;

    const statusMap = {
      added: `Property '${path}${key}' was ${status} with value: ${stringifyValue(value)}`,
      deleted: `Property '${path}${key}' was ${status}`,
      changed: `Property '${path}${key}' was ${status} from ${stringifyValue(prevValue)} to ${stringifyValue(value)}`,
      notChanged: '',
    };

    if (!children) {
      return [...acc, statusMap[status]];
    }
    return [...acc, ...render(children, `${path}${key}.`)];
  }, []);
};

export default (ast) => _.compact(render(ast)).join('\n');
